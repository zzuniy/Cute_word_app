import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

type Level = "easy" | "medium" | "hard";
type ThemeMode = "dark" | "light";

const LEVELS: { value: Level; label: string }[] = [
  { value: "easy", label: "쉬움" },
  { value: "medium", label: "중간" },
  { value: "hard", label: "어려움" },
];

export default function AddWordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ themeMode?: ThemeMode }>();
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [level, setLevel] = useState<Level>("easy");
  const themeMode: ThemeMode = params.themeMode === "light" ? "light" : "dark";
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  const isSaveDisabled = useMemo(() => {
    return !term.trim() || !definition.trim() || !example.trim();
  }, [term, definition, example]);

  const onSave = () => {
    const nextTerm = term.trim();
    const nextDefinition = definition.trim();
    const nextExample = example.trim();
    if (!nextTerm || !nextDefinition || !nextExample) return;

    router.replace({
      pathname: "/(tabs)",
      params: {
        term: nextTerm,
        definition: nextDefinition,
        example: nextExample,
        level,
        addedAt: Date.now().toString(),
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: theme.text }]}>단어 추가</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>새 단어를 입력하고 난이도를 선택해 저장하세요.</Text>

        <Text style={[styles.label, { color: theme.label }]}>단어</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.inputBorder, backgroundColor: theme.inputBg, color: theme.text }]}
          value={term}
          onChangeText={setTerm}
          placeholder="예: Curious"
          placeholderTextColor={theme.subText}
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: theme.label }]}>뜻</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.inputBorder, backgroundColor: theme.inputBg, color: theme.text }]}
          value={definition}
          onChangeText={setDefinition}
          placeholder="뜻을 입력하세요"
          placeholderTextColor={theme.subText}
        />

        <Text style={[styles.label, { color: theme.label }]}>예문</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.inputBorder, backgroundColor: theme.inputBg, color: theme.text }]}
          value={example}
          onChangeText={setExample}
          placeholder="예문을 입력하세요"
          placeholderTextColor={theme.subText}
        />

        <Text style={[styles.label, { color: theme.label }]}>난이도</Text>
        <View style={styles.levelRow}>
          {LEVELS.map((item) => {
            const isActive = level === item.value;
            return (
              <Pressable
                key={item.value}
                onPress={() => setLevel(item.value)}
                style={({ pressed }) => [
                  styles.levelButton,
                  {
                    borderColor: isActive ? theme.accent : theme.inputBorder,
                    backgroundColor: isActive ? theme.accent : theme.inputBg,
                  },
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={[styles.levelText, { color: isActive ? "#111111" : theme.subText }]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actionRow}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.cancelButton,
              { backgroundColor: theme.cancelBg },
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={[styles.cancelText, { color: theme.text }]}>취소</Text>
          </Pressable>
          <Pressable
            onPress={onSave}
            disabled={isSaveDisabled}
            style={({ pressed }) => [
              styles.saveButton,
              { backgroundColor: theme.saveBg },
              isSaveDisabled && styles.saveButtonDisabled,
              pressed && !isSaveDisabled && styles.buttonPressed,
            ]}
          >
            <Text style={[styles.saveText, { color: theme.saveText }]}>저장</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const darkTheme = {
  background: "#0B0B0D",
  text: "#FFFFFF",
  subText: "#A0A0A9",
  label: "#C4C4CC",
  inputBg: "#111115",
  inputBorder: "#34343D",
  accent: "#5BFFB5",
  cancelBg: "#25252E",
  saveBg: "#5BFFB5",
  saveText: "#111111",
} as const;

const lightTheme = {
  background: "#F6F7FB",
  text: "#111111",
  subText: "#667085",
  label: "#485061",
  inputBg: "#FFFFFF",
  inputBorder: "#D8DCE8",
  accent: "#5BFFB5",
  cancelBg: "#E9EDF6",
  saveBg: "#0FA968",
  saveText: "#FFFFFF",
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111111",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 14,
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "700",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  levelRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  levelButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  levelText: {
    fontWeight: "700",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "700",
  },
  saveButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.45,
  },
  saveText: {
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
