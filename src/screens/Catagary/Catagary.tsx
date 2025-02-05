import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const CategoryScreen = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('timers');
      if (storedHistory) {
        const parsedHistory: {category: string}[] = JSON.parse(storedHistory);
        setHistory(parsedHistory);

        const uniqueCategories: string[] = [
          'All',
          ...Array.from(new Set(parsedHistory.map(item => item.category))),
        ];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Filter Timers based on Selected Category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(
        history.filter(item => item.category === selectedCategory),
      );
    }
  }, [selectedCategory, history]);

  return (
    <View style={{flex: 1, backgroundColor: '#121212', padding: 20}}>
      {/* Category Filter Dropdown */}
      <View
        style={{
          backgroundColor: '#1e1e1e',
          borderRadius: 10,
          marginBottom: 20,
        }}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={value => setSelectedCategory(value)}
          style={{color: '#fff'}}>
          {categories.map(category => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {/* Filtered Timer List */}
      <FlatList
        data={filteredHistory}
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
              Category:{' '}
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                {item.category}
              </Text>
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{color: '#fff', textAlign: 'center'}}>
            No timers found
          </Text>
        }
      />
    </View>
  );
};

export default CategoryScreen;
