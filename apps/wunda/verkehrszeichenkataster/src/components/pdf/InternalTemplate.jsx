import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

const BorderedText = ({ title, text }) => {
  return (
    <View
      style={{
        border: 1,
        textAlign: "left",
        fontSize: 16,
        padding: 6,
        gap: 6,
      }}
    >
      <Text>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
};

const InternalTemplate = ({ timeline, title }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{ flexDirection: "column", padding: 20, gap: 6, fontSize: 14 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "column",
              gap: 24,
            }}
          >
            <Text>104.11</Text>
            <Text style={{ fontSize: 24 }}>104.23</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            <Text>05.01.2023/ 563 5195</Text>
            <Text>Max.Mustermann@stadt.wuppertal.de</Text>
          </View>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Nr.: 3/2023 Prio:
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>{title}</Text>
        {timeline.map((attachment) => {
          if (attachment.typ === "text") {
            return (
              <BorderedText title={attachment.name} text={attachment.text} />
            );
          } else if (attachment.typ === "file") {
            return <Image src={attachment.file} />;
          }
        })}
        <Text>
          Mit der Bitte, die vorstehende aufgeführte/n Maßnahme/n nach § 45 Abs.
          5 StVO zu veranlassen und den Tag der Durchführung auf der
          Durchschrift mit zu teilen.
        </Text>
        <Text>2 - Polizeipräsident / Direktion Verkehr - z.K.</Text>
        <Text>3 - z.V.</Text>
        <Text>i.A.</Text>
        <Text>Max Mustermann</Text>
        <Text>An 104. 11</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Die angeordnete/n Maßnahme/n wurden/n am</Text>
          <Text>durchgeführt.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InternalTemplate;
