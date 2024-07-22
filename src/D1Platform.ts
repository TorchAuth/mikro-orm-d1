// @ts-ignore
import { escape } from "sqlstring-sqlite";
import { JsonProperty, Utils, type EntityProperty } from "@mikro-orm/core";
import { BaseSqlitePlatform } from "@mikro-orm/knex";
import { D1SchemaHelper } from "./D1SchemaHelper";
import { D1ExceptionConverter } from "./D1ExceptionConverter";

export class D1Platform extends BaseSqlitePlatform {
  protected override readonly schemaHelper: D1SchemaHelper = new D1SchemaHelper(
    this
  );
  protected override readonly exceptionConverter = new D1ExceptionConverter();

  override quoteVersionValue(
    value: Date | number,
    prop: EntityProperty
  ): Date | string | number {
    /* istanbul ignore if */
    if (prop.runtimeType === "Date") {
      return escape(value, true, this.timezone).replace(/^'|\.\d{3}'$/g, "");
    }

    return value;
  }

  override quoteValue(value: any): string {
    /* istanbul ignore if */
    if (Utils.isPlainObject(value) || value?.[JsonProperty]) {
      return escape(JSON.stringify(value), true, this.timezone);
    }

    if (value instanceof Date) {
      return "" + +value;
    }

    return escape(value, true, this.timezone);
  }
}
