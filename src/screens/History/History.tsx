import {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    'Pending' | 'Paused' | 'Completed'
  >('Pending');

  const filterTimersByStatus = (status: 'Pending' | 'Paused' | 'Completed') => {
    return history.filter((item: {status: string}) => item.status === status);
  };

  const loadHistory = async () => {
    const storedHistory = await AsyncStorage.getItem('timers');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  };

  useEffect(() => {
    loadHistory();
  }, [activeTab]);

  return (
    <View style={{flex: 1, backgroundColor: '#121212', padding: 20}}>
      <Text
        style={{
          color: '#fff',
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Timers History
      </Text>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#333',
          borderRadius: 25,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {['Pending', 'Paused', 'Completed'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() =>
              setActiveTab(tab as 'Pending' | 'Paused' | 'Completed')
            }
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: activeTab === tab ? '#6200ee' : 'transparent',
            }}>
            <Text
              style={{
                color: activeTab === tab ? '#fff' : '#aaa',
                fontWeight: 'bold',
              }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filterTimersByStatus(activeTab)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: '#1e1e1e',
              padding: 15,
              marginVertical: 10,
              borderRadius: 10,
              borderLeftWidth: 5,
              borderLeftColor: '#6200ee',
            }}>
            <Text style={{color: '#bbb', fontSize: 14}}>
              Name:{' '}
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                {item.name}
              </Text>
            </Text>
            <Text style={{color: '#bbb', fontSize: 14}}>
              Remaining Time:{' '}
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                {item.remaining}s
              </Text>
            </Text>
            <Text style={{color: '#bbb', fontSize: 14}}>
              Status:{' '}
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                {item.status}
              </Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default History;
