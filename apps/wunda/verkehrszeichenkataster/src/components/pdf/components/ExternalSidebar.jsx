import { Text, View } from "@react-pdf/renderer";

const ExternalSidebar = () => {
  return (
    <View style={{ flexDirection: "column", gap: 20, fontSize: 12 }}>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Stadt Wuppertal</Text>
        <Text>Der Oberbürgermeister</Text>
        <Text>Ressort 104.11</Text>
        <Text>Straßen und Verkehr</Text>
        <Text>Johannes-Rau-Platz 1</Text>
        <Text>42275 Wuppertal</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Ansprechpartner/in</Text>
        <Text>Max Mustermann</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Az</Text>
        <Text>624/2023</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Telefon</Text>
        <Text>624/2023</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Telefax</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>E-Mail</Text>
        <Text>max.mustermann@</Text>
        <Text>stadt.wuppertal.de</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Zimmer</Text>
        <Text>C-481</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Sprechzeiten</Text>
        <Text>nach Vereinbarung</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Bankverbindung</Text>
        <Text>Stadt Wuppertal</Text>
        <Text>BIC</Text>
        <Text>IBAN</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Internet</Text>
        <Text>www.wuppertal.de</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Newsletter</Text>
        <Text>www.wuppertal.de/news</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>De-Mail-Postfach</Text>
        <Text>info@</Text>
        <Text>stadt.wuppertal.de-</Text>
        <Text>mail.de</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Servicecenter</Text>
        <Text>+49 123 456-0</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 2 }}>
        <Text>Seite</Text>
        <Text>1 von 2</Text>
      </View>
    </View>
  );
};

export default ExternalSidebar;
