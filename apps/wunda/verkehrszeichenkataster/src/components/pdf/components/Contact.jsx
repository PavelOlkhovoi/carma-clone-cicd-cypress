import { Text, View } from "@react-pdf/renderer";

const Contact = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 2,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <Text style={{ fontSize: 6 }}>
        Stadt Wuppertal - 104.11 - 42269 Wuppertal
      </Text>
      <Text>Herr</Text>
      <Text>Max Mustermann</Text>
      <Text>Muster GmBH</Text>
      <Text>Musterstraße 32</Text>
      <Text>42285 Wuppertal</Text>
    </View>
  );
};

export default Contact;
