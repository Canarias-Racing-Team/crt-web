import type { SupporterItem } from "@types";
import { loadImageEntries } from "@utils/imageUtils";

// Lee y parsea CSV de mecenas en SSR
let fs: typeof import("fs") | undefined;
let path: typeof import("path") | undefined;
if (import.meta.env.SSR) {
  fs = await import("fs");
  path = await import("path");
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let curField = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        curField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      cur.push(curField);
      curField = "";
      continue;
    }
    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (curField !== "" || cur.length > 0) {
        cur.push(curField);
        rows.push(cur);
        cur = [];
        curField = "";
      }
      // handle CRLF by skipping next \n if current is \r
      if (ch === "\r" && text[i + 1] === "\n") i++;
      continue;
    }
    curField += ch;
  }
  if (curField !== "" || cur.length > 0) {
    cur.push(curField);
    rows.push(cur);
  }
  return rows;
}

export async function loadSupportersFromCSV(
  relPath: string,
): Promise<SupporterItem[]> {
  if (!fs || !path) return [];
  const filePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return [];
  const raw = await fs.promises.readFile(filePath, "utf-8");
  const rows = parseCSV(raw);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  const normKeys = headers.map((h) =>
    h
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ""),
  );
  const items: SupporterItem[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0) continue;
    const obj: any = {};
    const objNorm: any = {};
    for (let j = 0; j < headers.length; j++) {
      const raw = row[j] ?? "";
      obj[headers[j]] = raw;
      objNorm[normKeys[j]] = raw;
    }
    // Normalize type: convert any deprecated or unexpected values (e.g. "mixed")
    let t = (obj.type as any) || (obj.logo ? "logo" : "text");
    if (t === "mixed") t = "logo";

    // Build item only with fields present in the CSV header (use normalized keys)
    const item: any = {};
    item.id = obj.id || `s_${i}`;
    item.type = t;
    if (normKeys.includes("name")) item.name = objNorm.name || undefined;
    if (normKeys.includes("url")) item.url = objNorm.url || undefined;
    if (normKeys.includes("logo")) item.logo = objNorm.logo || undefined;
    if (normKeys.includes("alt"))
      item.alt = objNorm.alt || objNorm.name || undefined;
    if (normKeys.includes("size"))
      item.size = (objNorm.size as any) || undefined;
    if (normKeys.includes("priority"))
      item.priority = objNorm.priority ? Number(objNorm.priority) : undefined;
    // Support optional noFilter/no_filter/nofilter header -> set item.noFilter
    if (normKeys.includes("nofilter"))
      item.noFilter = objNorm.nofilter || undefined;

    // Intentar resolver logos locales bajo /src/assets/fotos/... usando loadImageEntries
    if (
      item.logo &&
      typeof item.logo === "string" &&
      item.logo.startsWith("/src/assets/fotos/")
    ) {
      const rel = item.logo.replace("/src/assets/fotos/", "");
      const parts = rel.split("/");
      const file = parts.pop();
      const folder = parts.join("/");
      try {
        const imgs = await loadImageEntries(folder, file ? [file] : undefined);
        if (imgs && imgs.length > 0) {
          item.logo = imgs[0].src as unknown as string;
          item.alt = item.alt || imgs[0].alt;
        }
      } catch (e) {
        // si falla, dejamos el string tal cual
      }
    }
    items.push(item);
  }
  return items;
}

export async function loadSupporters(): Promise<SupporterItem[]> {
  // Por compatibilidad, devuelve los mecenas del año más reciente
  const byYear = await loadSupportersByYear();
  if (!byYear || byYear.length === 0) return [];
  // Ordenar por año descendente y devolver el primero
  const sorted = byYear.sort((a, b) => Number(b.year) - Number(a.year));
  return sorted[0].items || [];
}

export async function loadSupportersByYear(
  relFolder = "src/data/crowdfundings",
): Promise<Array<{ year: string; items: SupporterItem[] }>> {
  if (!fs || !path) return [];
  const folderPath = path.join(process.cwd(), relFolder);
  if (!fs.existsSync(folderPath)) return [];
  const files = await fs.promises.readdir(folderPath);
  const map: Array<{ year: string; items: SupporterItem[] }> = [];
  const regex = /^crowdfunding-(\d{4})\.csv$/i;
  for (const f of files) {
    const m = f.match(regex);
    if (!m) continue;
    const year = m[1];
    const rel = path.join(relFolder, f);
    try {
      const items = await loadSupportersFromCSV(rel);
      map.push({ year, items });
    } catch (e) {
      // ignorar un archivo con error y seguir
    }
  }
  // Ordenar por año ascendente para consistencia
  return map.sort((a, b) => Number(a.year) - Number(b.year));
}
