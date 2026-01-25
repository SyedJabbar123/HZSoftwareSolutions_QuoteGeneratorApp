import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    useColorScheme,
    Animated,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
    const quotes = [
        { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
        { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
        { text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },
        { text: 'Get busy living or get busy dying.', author: 'Stephen King' },
        { text: 'You have within you right now, everything you need.', author: 'Brian Tracy' }
    ];

    const initialIndex = quotes.length > 0 ? Math.floor(Math.random() * quotes.length) : 0;
    const [currentQuote, setCurrentQuote] = useState(quotes.length > 0 ? quotes[initialIndex] : null);
    const fadeAnim = useRef(new Animated.Value(1)).current;



    if (quotes.length === 0) return null;

    const Change = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * quotes.length);
            } while (quotes[randomIndex].text === currentQuote?.text);

            setCurrentQuote(quotes[randomIndex]);

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        });
    };

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={['#ffffff', '#3ae2cb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {/* <StatusBar translucent backgroundColor="transparent" /> */}
            <StatusBar style="auto" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <View style={styles.header}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#121111' }}>
                        Welcome to Quote Generator App
                    </Text>
                </View>

                <View style={styles.quotesBox}>
                    <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                        <Text style={styles.quoteText}>"{currentQuote?.text}"</Text>
                        <Text style={styles.authorText}>Author— {currentQuote?.author}</Text>
                    </Animated.View>
                </View>

                <TouchableOpacity style={styles.newQtBtn} onPress={Change}>
                    <Text style={{ color: '#fff', fontWeight: '600' }}>New Quote</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default App;

const styles = StyleSheet.create({
    header: { marginBottom: 20 },
    quotesBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        borderRadius: 16,
        backgroundColor: '#e3f3ef',
        padding: 20,
        marginTop: 30,
        elevation: 5, // Adds a nice shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    quoteText: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#333' },
    authorText: { textAlign: 'center', fontSize: 12, fontStyle: 'italic', marginTop: 10, color: '#555' },
    newQtBtn: {
        marginTop: 20,
        backgroundColor: 'rgb(117, 206, 222)',
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
    },
});