import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';

interface PageHeaderProps{
    title: string;
    headerRight?: ReactNode;
}


import styles from './styles';
const PageHeader: React.FC<PageHeaderProps> = ({ headerRight, title, children }) => {
    const { navigate }= useNavigation();
    function handdlerGoBack(){
        navigate('Landing');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handdlerGoBack}>
                    <Image source={backIcon} resizeMode='contain' />
                </BorderlessButton>
                
                <Image source={logoImage} resizeMode='contain' />
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                
                {headerRight}
            </View>

            {children}
        </View>
    );
}

export default PageHeader;