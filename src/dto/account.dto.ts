import {
  IsEnum,
  IsISO4217CurrencyCode,
  IsInt,
  IsString,
  Matches,
} from "class-validator";
import { AccountCategory, Platform } from "../types/authorise";

export class AccountDTO {
  @IsEnum(AccountCategory)
  account_category: AccountCategory;

  @IsString()
  account_type: string;

  @IsInt()
  created_at: number;

  @IsISO4217CurrencyCode()
  currency: string;

  @IsInt()
  excluded_until?: number;

  @Matches(/0|1/)
  is_disabled: 0 | 1;

  @Matches(/0|1/)
  is_virtual: 0 | 1;

  @Matches(/(virtual|svg|malta|iom)/)
  landing_company_name: string;

  @IsString()
  loginid: string;

  linked_to?: LinkedAccountDTO[];
}

export class LinkedAccountDTO {
  @IsString()
  loginid: string;

  @IsEnum(Platform)
  platform: Platform;
}
