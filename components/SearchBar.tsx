import { Image, StyleSheet, TextInput, View } from "react-native"
import { Row } from "./Row"
import { useThemeColors } from "@/hooks/useThemeColors"

type Props = {
    value: string,
    onChange: (s:string) => void
}

export function SearchBar({value, onChange}: Props) {
    const colors = useThemeColors()
    return (
        <Row gap={0} style={[styles.wrapper, {backgroundColor: colors.grayWhite}]}>
            <Image source={require('@/assets/images/search.png')} width={16} height={16} />
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
        </Row>
    )   
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 48,
        paddingHorizontal: 12
    },
    input: {
        // flex: 1,
        height: 48,
        fontSize: 12,
        lineHeight: 16,
    }
})