import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem/index';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { Teacher } from '../../components/TeacherItem/index';

function TeacherList(){
    const [ isfilterVisible, setIsfilterVisible] = useState(false);
    
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);
    
    function handleToggleFiltersVisible(){
        setIsfilterVisible(!isfilterVisible);
    }

    async function handleFilterSubmit(){
        console.log("Filtro: ",{
            subject, week_day, time,
        })
        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            }
        })
        //console.log(response.data);
        setTeachers(response.data);
        setIsfilterVisible(false);
    }


    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponiveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >

                {isfilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc'
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />               

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc'
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Qual horário?'
                                    placeholderTextColor='#c1bccc'
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>
            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
                
                           
            </ScrollView>

        </View>
    )
}

export default TeacherList;