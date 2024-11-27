import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemedText } from "@/components/ThemeText";
import { getPokemonId } from "@/functions/pokemon";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors()
  // const pokemons = Array.from({length: 35}, (_, k) => ({
  //   name: 'Pokémon name',
  //   id: k + 1
  // }))

  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21');
  const pokemons = data?.pages.flatMap(
    page => page.results.map(r => ({name: r.name, id: getPokemonId(r.url)}))) ?? [];
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const filteredPokemons = [...(search 
    ? pokemons.filter(
      p => p.name.includes(search.toLocaleLowerCase()) || p.id.toString() === search)
    : pokemons)].sort((a,b) => (a[sortKey] < b[sortKey]) ? -1 : 1);
  

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <ThemedText variant="headline" color="grayWhite">Pokédex</ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList 
          data={filteredPokemons}
          numColumns={3} 
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint}/> : null
          }
          onEndReached={search ? undefined : () => fetchNextPage()}
          renderItem={({item}) => <PokemonCard id={item.id} name={item.name} style={{flex: 1, height: 200}}/>} 
          keyExtractor={(item) => item.id.toString()}/>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  body: {
    flex: 1,
    marginTop: 24
  },
  gridGap: {
    gap: 8
  },
  list: {
    padding: 12
  },
  form: {
    paddingHorizontal: 12
  }
})
