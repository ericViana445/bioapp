import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER – PADRÃO DO APP */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Política de Privacidade</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.update}>Última atualização: 28/01/2026</Text>

        <Text style={styles.text}>
          A sua privacidade é importante para nós. Esta Política de Privacidade
          explica como coletamos, usamos e protegemos suas informações ao utilizar
          o BioApp.
        </Text>

        {/* 1 */}
        <Text style={styles.sectionTitle}>1. Informações que coletamos</Text>
        <Text style={styles.text}>Podemos coletar as seguintes informações:</Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>
            Dados pessoais: nome, e-mail e informações fornecidas durante o cadastro.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>
            Dados de uso: telas acessadas, interações no aplicativo e preferências.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>
            Dados técnicos: tipo de dispositivo, sistema operacional e informações
            de navegação.
          </Text>
        </View>

        <Text style={styles.warning}>
          ⚠️ O BioApp não realiza diagnósticos médicos e não substitui a avaliação
          de um profissional de saúde.
        </Text>

        {/* 2 */}
        <Text style={styles.sectionTitle}>2. Uso das informações</Text>

        {[
          'Permitir o acesso à sua conta',
          'Personalizar sua experiência no app',
          'Enviar comunicações relacionadas à conta',
          'Melhorar funcionalidades e segurança',
          'Cumprir obrigações legais',
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}

        {/* 3 */}
        <Text style={styles.sectionTitle}>3. Compartilhamento de dados</Text>
        <Text style={styles.text}>
          Seus dados não são vendidos. O compartilhamento ocorre apenas quando:
        </Text>

        {[
          'Exigido por lei',
          'Necessário para funcionamento do app (ex: serviços de autenticação)',
          'Com seu consentimento explícito',
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}

        {/* 4 */}
        <Text style={styles.sectionTitle}>4. Segurança das informações</Text>
        <Text style={styles.text}>
          Adotamos medidas técnicas e organizacionais para proteger seus dados
          contra acesso não autorizado, perda ou uso indevido. Mesmo assim,
          nenhum sistema é 100% seguro.
        </Text>

        {/* 5 */}
        <Text style={styles.sectionTitle}>5. Seus direitos</Text>

        {[
          'Acessar, corrigir ou excluir seus dados',
          'Solicitar informações sobre o uso dos seus dados',
          'Revogar consentimentos quando aplicável',
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}

        {/* 6 */}
        <Text style={styles.sectionTitle}>6. Alterações nesta política</Text>
        <Text style={styles.text}>
          Podemos atualizar esta Política periodicamente. Recomendamos que você
          revise esta página regularmente.
        </Text>

        {/* 7 */}
        <Text style={styles.sectionTitle}>7. Contato</Text>
        <Text style={styles.text}>
          Em caso de dúvidas, entre em contato pelo e-mail:
        </Text>
        <Text style={styles.text}>ericviana445@gmail.com</Text>

        {/* TERMOS */}
        <Text style={styles.sectionTitle}>Termos e Condições</Text>

        <Text style={styles.text}>
          Ao utilizar o BioApp, você concorda com estes Termos e Condições.
        </Text>

        <Text style={styles.text}>
          O BioApp é um aplicativo informativo voltado à educação e organização
          de exames laboratoriais. O conteúdo não substitui orientação médica
          nem deve ser usado para autodiagnóstico.
        </Text>

        <Text style={styles.text}>
          Todo o conteúdo do app é protegido por direitos autorais e pertence
          ao BioApp. É proibido copiar, distribuir ou modificar sem autorização.
        </Text>

        <Text style={styles.text}>
          Este contrato é regido pelas leis brasileiras.
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 16,
  },

  update: {
    fontSize: 14,
    fontFamily: 'LeagueSpartan-ExtraLight',
    color: '#6B7280',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#2563EB',
    marginTop: 16,
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    fontFamily: 'LeagueSpartan-ExtraLight',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 0,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },

  bullet: {
    fontSize: 14,
    lineHeight: 22,
    marginRight: 6,
    fontFamily: 'LeagueSpartan-ExtraLight',
  },

  warning: {
    fontSize: 14,
    fontFamily: 'LeagueSpartan-ExtraLight',
    color: '#B91C1C',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 12,
  },
});
