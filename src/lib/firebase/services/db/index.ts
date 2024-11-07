import { systemVariables } from "./system-variables";
import { wine } from "./wine";
import { winery } from "./winery";

const db: any = {};

db.winery = winery;
db.wine = wine;
db.systemVariables = systemVariables;

export { db };
