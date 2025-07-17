import { gql } from "graphql-request";
import queries from "./queries";

export const REST_SERVICE = "https://wunda-cloud.cismet.de/wunda/api";
export const DOMAIN = "WUNDA_BLAU";
export const ENDPOINT = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";
export const APP_KEY = "verkehrszeichen-kataster";
export const STORAGE_PREFIX = "1";
export const STORAGE_POSTFIX = "1";

export const jwtTestQuery = gql`
  ${queries.jwtTestQuery}
`;

export const landParcelQuery = gql`
  ${queries.landParcel}
`;
