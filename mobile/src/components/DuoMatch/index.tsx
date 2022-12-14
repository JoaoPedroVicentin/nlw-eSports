import { useState } from 'react';
import { Modal, View, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as ClipBoard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string,
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const[isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordUserToClipboard() {
        setIsCopping(true)
        await ClipBoard.setStringAsync(discord)

        Alert.alert('Discord Copiado!', 'Usuário copiado para você colar no Discord.')
        setIsCopping(false)
    }

    return (
        <Modal animationType='fade' transparent statusBarTranslucent {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} weight='bold' color={THEME.COLORS.SUCCESS} />

                    <Heading title="Let`s Play!" subtitle='Agora é só começar a jogar!' style={{ alignItems: 'center', marginTop: 24 }} />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity onPress={handleCopyDiscordUserToClipboard} disabled={isCopping} style={styles.discordButton}>
                        <Text style={styles.discord}>
                            { isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}