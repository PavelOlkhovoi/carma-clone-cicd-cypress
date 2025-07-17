const queries = {};
export default queries;

queries.jwtTestQuery = `
query Test {
  __typename ## Placeholder value
}`;

queries.landParcel = `
query MyQuery($bbPoly: geometry) {
  alkis_landparcel(where: {geom: {geo_field: {_st_intersects: $bbPoly}}}) {
    gemarkung
    flur
    fstck_nenner
    fstck_zaehler
    id
    geom {
      geo_field
    }
  }
}`;
