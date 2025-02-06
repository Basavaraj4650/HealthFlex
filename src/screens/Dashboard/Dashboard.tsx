import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  Modal,
  ToastAndroid,
} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './style';

interface Timer {
  id: number;
  name: string;
  duration: number;
  category: string;
  remaining: number;
  running: boolean;
  status: string;
}

export const Categories = ['Select Category', 'Workout', 'Study', 'Break'];

const Dashboard: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [category, setCategory] = useState<string>(Categories[0]);
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    duration?: string;
    category?: string;
  }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = prevTimers.map(timer => {
          if (timer.running && timer.remaining > 0) {
            return {...timer, remaining: timer.remaining - 1};
          } else if (timer.running && timer.remaining === 0) {
            setCompletedTimerName(timer.name);
            setModalVisible(true);
            return {...timer, running: false, status: 'Completed'};
          }
          return timer;
        });
        saveTimers(updatedTimers);
        return updatedTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadTimers();
  }, []);

  const saveTimers = async (timers: Timer[]) => {
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
  };

  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem('timers');
    if (storedTimers) {
      setTimers(JSON.parse(storedTimers));
    }
  };

  const addTimer = () => {
    let newErrors: {name?: string; duration?: string; category?: string} = {};

    if (!name) newErrors.name = 'Timer Name is required';
    if (!duration) newErrors.duration = 'Duration is required';
    if (category === 'Select Category')
      newErrors.category = 'Please select a valid category';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newTimer: Timer = {
      id: Date.now(),
      name,
      duration: parseInt(duration),
      category,
      remaining: parseInt(duration),
      running: false,
      status: 'Pending',
    };
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
    setName('');
    setDuration('');
    setCategory(Categories[0]);
    Keyboard.dismiss();
    ToastAndroid.show('Timer Added Successfully !', ToastAndroid.SHORT);
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const startTimer = (id: number) => {
    const updatedTimers = timers.map(timer =>
      timer.id === id ? {...timer, running: true, status: 'Pending'} : timer,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const pauseTimer = (id: number) => {
    const updatedTimers = timers.map(timer =>
      timer.id === id ? {...timer, running: false, status: 'Paused'} : timer,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const resetTimer = (id: number) => {
    const updatedTimers = timers.map(timer =>
      timer.id === id
        ? {
            ...timer,
            remaining: timer.duration,
            running: false,
            status: 'Pending',
          }
        : timer,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const startAllTimersInCategory = (category: string) => {
    const updatedTimers = timers.map(timer =>
      timer.category === category
        ? {...timer, running: true, status: 'Pending'}
        : timer,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const pauseAllTimersInCategory = (category: string) => {
    const updatedTimers = timers.map(timer =>
      timer.category === category
        ? {...timer, running: false, status: 'Paused'}
        : timer,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const resetAllTimersInCategory = (category: string) => {
    const updatedTimers = timers.map(timer =>
      timer.category === category
        ? {
            ...timer,
            remaining: timer.duration,
            running: false,
            status: 'Pending',
          }
        : timer,
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Timer</Text>
      <PaperTextInput
        mode="outlined"
        label={<Text style={styles.inputLabel}>Name</Text>}
        value={name}
        onChangeText={text => {
          setName(text);
          setErrors(prev => ({...prev, name: undefined}));
        }}
        style={styles.input}
        placeholderTextColor="#bbb"
        textColor="#fff"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <PaperTextInput
        mode="outlined"
        label={<Text style={styles.inputLabel}>Duration (sec)</Text>}
        value={duration}
        onChangeText={text => {
          setDuration(text);
          setErrors(prev => ({...prev, duration: undefined})); // Clear error on typing
        }}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#bbb"
        textColor="#fff"
      />
      {errors.duration && (
        <Text style={styles.errorText}>{errors.duration}</Text>
      )}
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={value => {
          setCategory(value);
          setErrors(prev => ({...prev, category: undefined})); // Clear error on selection
        }}
        style={styles.picker}
        dropdownIconColor="#fff">
        {Categories.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>
      {errors.category && (
        <Text style={styles.errorText}>{errors.category}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={addTimer}>
        <Text style={styles.buttonText}>Add Timer</Text>
      </TouchableOpacity>

      <ScrollView style={{flex: 1}}>
        {Categories.map(cat => {
          const categoryTimers = timers.filter(t => t.category === cat);
          if (categoryTimers.length === 0) return null;

          return (
            <View key={cat}>
              <View
                style={{
                  backgroundColor: '#333',
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  onPress={() => toggleCategory(cat)}
                  style={styles.categoryHeader}>
                  <Text style={styles.categoryText}>
                    {cat} ({timers.filter(t => t.category === cat).length})
                  </Text>
                  <Icon
                    name={
                      expandedCategories[cat] ? 'expand-less' : 'expand-more'
                    }
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>

                <View style={styles.bulkActionsContainer}>
                  <TouchableOpacity
                    onPress={() => startAllTimersInCategory(cat)}
                    style={styles.bulkActionButton}>
                    <Text style={styles.bulkActionText}>Start All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => pauseAllTimersInCategory(cat)}
                    style={styles.bulkActionButton}>
                    <Text style={styles.bulkActionText}>Pause All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => resetAllTimersInCategory(cat)}
                    style={styles.bulkActionButton}>
                    <Text style={styles.bulkActionText}>Reset All</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {expandedCategories[cat] && (
                <FlatList
                  data={timers.filter(t => t.category === cat)}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <View style={styles.timerCard}>
                      <Text style={styles.labelText}>
                        Name: <Text style={styles.valueText}>{item.name}</Text>
                      </Text>
                      <Text style={styles.labelText}>
                        Remaining Time:{' '}
                        <Text style={styles.valueText}>{item.remaining}s</Text>
                      </Text>
                      <Text style={styles.labelText}>
                        Status:{' '}
                        <Text style={styles.valueText}>
                          {item.running
                            ? 'Running'
                            : item.remaining === 0
                            ? 'Completed'
                            : item.remaining === item.duration
                            ? 'Reset to original duration.'
                            : 'Paused'}
                        </Text>
                      </Text>

                      <View style={styles.progressBarContainer}>
                        <View
                          style={[
                            styles.progressBar,
                            {
                              width: `${
                                ((item.duration - item.remaining) /
                                  item.duration) *
                                100
                              }%`,
                            },
                          ]}
                        />
                        <Text style={styles.progressText}>
                          {Math.round(
                            ((item.duration - item.remaining) / item.duration) *
                              100,
                          )}
                          %
                        </Text>
                      </View>

                      <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => startTimer(item.id)}>
                          <Icon name="play-arrow" size={24} color="#0f0" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pauseTimer(item.id)}>
                          <Icon name="pause" size={24} color="#ff0" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => resetTimer(item.id)}>
                          <Icon name="replay" size={24} color="#f00" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          );
        })}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>🎉 Timer Completed!</Text>
              <Text style={styles.modalMessage}>
                {completedTimerName} has finished.
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
