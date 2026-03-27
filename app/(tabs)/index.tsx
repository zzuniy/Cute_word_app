import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

type Vocab = {
  id: number;
  term: string;
  definition: string;
  example: string;
  level: "easy" | "medium" | "hard";
};

const VOCABS: Vocab[] = [
  {
    id: 1,
    term: "Pawsome",
    definition: "발바닥(paw) + awesome. 아주 멋진, 최고인.",
    example: "Your idea is pawsome!",
    level: "easy",
  },
  {
    id: 2,
    term: "Curious",
    definition: "호기심이 많은, 궁금해하는.",
    example: "Cats are very curious animals.",
    level: "easy",
  },
  {
    id: 3,
    term: "Brilliant",
    definition: "아주 훌륭한, 빛나는.",
    example: "She gave a brilliant answer.",
    level: "medium",
  },
  {
    id: 4,
    term: "Practice",
    definition: "연습하다 / 연습.",
    example: "Practice makes progress.",
    level: "easy",
  },
  {
    id: 5,
    term: "Efficient",
    definition: "효율적인, 능률적인.",
    example: "This method is very efficient.",
    level: "hard",
  },
  {
    id: 6,
    term: "Gentle",
    definition: "부드러운, 온화한.",
    example: "Be gentle with the kitten.",
    level: "easy",
  },
  {
    id: 7,
    term: "Cheerful",
    definition: "쾌활한, 명랑한.",
    example: "She always has a cheerful smile.",
    level: "easy",
  },
  {
    id: 8,
    term: "Improve",
    definition: "개선하다, 향상시키다.",
    example: "I want to improve my English.",
    level: "medium",
  },
  {
    id: 9,
    term: "Challenge",
    definition: "도전, 도전하다.",
    example: "This quiz is a fun challenge.",
    level: "medium",
  },
  {
    id: 10,
    term: "Discover",
    definition: "발견하다, 알아내다.",
    example: "We discovered a new cafe.",
    level: "medium",
  },
  {
    id: 11,
    term: "Reliable",
    definition: "믿을 수 있는, 신뢰할 만한.",
    example: "He is a reliable teammate.",
    level: "hard",
  },
  {
    id: 12,
    term: "Patient",
    definition: "참을성 있는.",
    example: "Please be patient and keep practicing.",
    level: "easy",
  },
  {
    id: 13,
    term: "Curate",
    definition: "선별하다, 선별해 구성하다.",
    example: "She curated a useful word list.",
    level: "hard",
  },
  {
    id: 14,
    term: "Memorize",
    definition: "암기하다, 기억하다.",
    example: "I memorize five words every day.",
    level: "medium",
  },
  {
    id: 15,
    term: "Consistent",
    definition: "일관된, 꾸준한.",
    example: "Consistent study builds strong skills.",
    level: "hard",
  },
];

export default function HomeScreen() {
  const [openedWordIds, setOpenedWordIds] = useState<number[] | number | null>([]);
  const normalizedOpenedWordIds = Array.isArray(openedWordIds)
    ? openedWordIds
    : openedWordIds === null
      ? []
      : [openedWordIds];

  const getLevelLabel = (level: Vocab["level"]) => {
    if (level === "easy") return "쉬움";
    if (level === "medium") return "보통";
    return "어려움";
  };

  const onPressWord = (id: number) => {
    setOpenedWordIds((prev) => {
      const prevIds = Array.isArray(prev) ? prev : prev === null ? [] : [prev];
      return prevIds.includes(id)
        ? prevIds.filter((wordId) => wordId !== id)
        : [...prevIds, id];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Pawsome Vocab</Text>
          <Text style={styles.subtitle}>저장된 영단어 목록</Text>
        </View>

        <View style={styles.listCard}>
          <Text style={styles.sectionTitle}>단어 리스트</Text>
          <Text style={styles.sectionDescription}>단어를 누르면 뜻과 예문이 펼쳐집니다.</Text>

          {VOCABS.map((vocab) => {
            const isOpened = normalizedOpenedWordIds.includes(vocab.id);

            return (
              <View key={vocab.id} style={[styles.listItem, isOpened && styles.listItemOpened]}>
                <Pressable style={styles.listItemTop} onPress={() => onPressWord(vocab.id)}>
                  <View>
                    <Text style={styles.listWordText}>{vocab.term}</Text>
                    <Text style={styles.listSubText}>난이도: {getLevelLabel(vocab.level)}</Text>
                  </View>
                  <Text style={styles.toggleText}>{isOpened ? "접기" : "보기"}</Text>
                </Pressable>

                {isOpened ? (
                  <View style={styles.detailBox}>
                    <Text style={styles.definitionText}>뜻: {vocab.definition}</Text>
                    <Text style={styles.exampleText}>예문: {vocab.example}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1E8",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 34,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#6D665B",
  },
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  sectionDescription: {
    marginTop: 4,
    marginBottom: 12,
    color: "#6D665B",
    fontSize: 13,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#E5DECF",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  listItemOpened: {
    backgroundColor: "#F0E8DA",
    borderColor: "#A6977E",
  },
  listItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listWordText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#141414",
  },
  listSubText: {
    marginTop: 2,
    fontSize: 12,
    color: "#665E53",
  },
  toggleText: {
    fontSize: 13,
    color: "#2B2B2B",
    fontWeight: "700",
  },
  detailBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#D8CEBD",
    gap: 6,
  },
  definitionText: {
    fontSize: 15,
    color: "#1F1F1F",
    lineHeight: 22,
  },
  exampleText: {
    fontSize: 14,
    color: "#555149",
    fontStyle: "italic",
  },
});
