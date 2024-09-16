import User from "../../types/users/user";
import UserType from "../../enums/user-type";
import SolicitorUser from "../../types/users/solicitor-user";
import config from "../config";
import Environment from "../../enums/environment";
import { getSolicitorUser } from "./user-utils";

export const claimantSolicitor: SolicitorUser = getSolicitorUser(
  "hmcts.civil+organisation.1.solicitor.1@gmail.com",
  config.environment === Environment.DEMO ? "B04IXE4" : "Q1KOKP2",
  UserType.CLAIMANT_SOLICITOR
);

export const claimantSolicitorBulkScan: User = getSolicitorUser(
  "hmcts.civil+organisation.1.solicitor.2@gmail.com",
  config.environment === Environment.DEMO ? "B04IXE4" : "Q1KOKP2",
  UserType.CLAIMANT_SOLICITOR_BULK_SCAN
);

export const defendantSolicitor1: User = getSolicitorUser(
  "hmcts.civil+organisation.2.solicitor.1@gmail.com",
  process.env.ENVIRONMENT === Environment.DEMO ? "DAWY9LJ" : "79ZRSOU",
  UserType.DEFENDANT_SOLICITOR_1
);

export const defendantSolicitor2: User = getSolicitorUser(
  "hmcts.civil+organisation.3.solicitor.1@gmail.com",
  process.env.ENVIRONMENT === Environment.DEMO ? "LCVTI1I" : "H2156A0",
  UserType.DEFENDANT_SOLICITOR_2
);
