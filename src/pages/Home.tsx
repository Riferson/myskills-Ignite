import React, {Fragment,useState,useEffect} from 'react';
import {View, Text,StyleSheet,TextInput, Platform,FlatList,StatusBar} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';


interface skillData {
    id: String;
    name: String;
    date?: Date;
}


export function Home() {

    const [newSkill,setNewSkill] = useState('');
    const [mySkills,setMySkills] = useState<skillData[]>([]);
    const [greeting,setGreeting] = useState('');
    function handleAddNewSkill(){
        const data={
            id: String(new Date().getTime()),
            name: newSkill,

        }
        setMySkills(oldState => [...oldState,data]);
    }

    function handleRemoveSkill(id:string){
        setMySkills(oldState =>oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(()=>{
        const currentHour = new Date().getHours();

        if(currentHour < 12){
            setGreeting('Bom dia!');
        }else if(currentHour <18 ){
            setGreeting('Boa tarde!');
        }else{
            setGreeting('Boa noite!');
        }
    },[])

  return(
    <View style={styles.container}>
        <Text style={styles.title}>Bem-Vindo, Rodrigo</Text>
        <Text style={styles.greetings}>{greeting}</Text>
        <TextInput style={styles.input} placeholder = "New Skills" placeholderTextColor='#555' onChangeText={setNewSkill}/>

        <Button onPress={handleAddNewSkill} title = 'Add'/>
        <Text style={[styles.title,{marginVertical:50}]}>
            My Skills
        </Text>

        <FlatList 
        data={mySkills} 
        keyExtractor={item =>item.id} 
        renderItem={({item})=> (
            <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)}/>
        )}
        />

            
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#121015',
        paddingHorizontal:20,
        paddingVertical:70,

    },
    title:{
        color:'#FFF',
        fontSize:24,
        fontWeight:'bold'
    },
    input:{
        backgroundColor:'#1F1E25',
        color:'#FFF',
        fontSize:16,
        padding:Platform.OS === 'ios' ? 15 :10,
        marginTop:30,
        borderRadius:7,
    },
    greetings:{
        color:'#FFF',

    },

})