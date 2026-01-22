import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function VerifyCodeScreen() {
  const router = useRouter();

  const [code, setCode] = useState(['', '', '', '', '']);

  const inputs = useRef<Array<TextInput | null>>([]);


  function handleChange(text: string, index: number) {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  }

  const isComplete = code.every(digit => digit !== '');

    function handleKeyPress(
    e: any,
    index: number
  ) {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Verifique seu Email</Text>

        <Text style={styles.subtitle}>
          Enviamos um código de verificação para o seu e-mail{'\n'}
          Insira o código de 5 dígitos mencionado no e-mail.
        </Text>

        {/* CÓDIGO */}
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                
              style={[
                styles.codeInput,
                digit ? styles.codeFilled : styles.codeEmpty,
              ]}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              keyboardType="number-pad"
              onKeyPress={e => handleKeyPress(e, index)}
              maxLength={1}
            />
          ))}
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            { backgroundColor: isComplete ? '#2563EB' : '#b1c1f5be' },
          ]}
          disabled={!isComplete}
        >
          <Text style={styles.verifyText}>Verificar Código</Text>
        </TouchableOpacity>

        {/* REENVIAR */}
        <Text style={styles.resendText}>
          Ainda não recebeu o e-mail?{' '}
          <Text style={styles.resendLink}>Reenviar email</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 32,
  },

  title: {
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'LeagueSpartan-light',
    lineHeight: 18,
    marginBottom: 24,
  },

  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  codeInput: {
    width: 52,
    height: 56,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  codeFilled: {
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },

  codeEmpty: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },

  verifyButton: {
    backgroundColor: '#b1c1f5be',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },

  verifyText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  resendText: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 12,
    color: '#000000',
  },

  resendLink: {
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
