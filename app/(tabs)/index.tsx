import LottieView from "lottie-react-native"; // 애니메이션 추가
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  // 상태 관리: 오늘의 단어 데이터
  const [word, setWord] = useState({
    term: "Pawsome",
    definition: "발바닥(Paw)과 아주 멋진(Awesome)의 합성어!",
  });

  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 상단 타이틀 */}
      <View style={styles.header}>
        <Text style={styles.title}>🐾 Pawsome Vocab</Text>
      </View>

      {/* 2. 메인 캐릭터 영역 (Lottie) */}
      <View style={styles.characterSection}>
        <LottieView
          autoPlay
          loop
          // 로컬 파일 대신 온라인에 있는 샘플 고양이 애니메이션 사용
          source={{
            uri: "https://assets5.lottiefiles.com/packages/lf20_swunp9sc.json",
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>

      {/* 3. 단어 카드 영역 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>오늘의 단어</Text>
        <Text style={styles.wordText}>{word.term}</Text>

        {isRevealed ? (
          <Text style={styles.definitionText}>{word.definition}</Text>
        ) : (
          <Text style={styles.placeholderText}>버튼을 눌러 뜻을 확인해봐!</Text>
        )}
      </View>

      {/* 4. 커스텀 버튼 (발바닥 버튼) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsRevealed(!isRevealed)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isRevealed ? "다시 숨기기" : "뜻 확인하기 🐾"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0", // 따뜻한 베이지색 (눈이 편안함)
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#4A3428", // 진한 갈색 (가독성 UP)
  },
  characterSection: {
    height: 220,
    justifyContent: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    // 그림자 효과 (iOS/Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 14,
    color: "#A3938B",
    marginBottom: 10,
    fontWeight: "600",
  },
  wordText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF8A65", // 포인트 컬러 (코랄색)
    marginBottom: 15,
  },
  definitionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#5D4037",
    lineHeight: 24,
  },
  placeholderText: {
    fontSize: 16,
    color: "#D1C4E9",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#FF8A65",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
