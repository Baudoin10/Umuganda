import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: 'Clean the Park',
    description: 'Clean the community park near Nyarugenge area.',
    dueDate: '2025-04-05',
    status: 'Pending',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Tree Planting',
    description: 'Help plant trees at Gisozi Hill.',
    dueDate: '2025-04-12',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Community Meeting',
    description: 'Attend the monthly community meeting.',
    dueDate: '2025-04-15',
    status: 'Completed',
    priority: 'Low',
  },
];

// Task card component
const TaskCard = ({ task }) => (
  <View style={{
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{task.title}</Text>
    <Text style={{ fontSize: 14, color: '#6e6e6e', marginTop: 5 }}>{task.description}</Text>
    <Text style={{ fontSize: 12, marginTop: 8, color: '#6e6e6e' }}>Due: {task.dueDate}</Text>
    <Text style={{
      fontSize: 12,
      marginTop: 4,
      color: task.status === 'Completed' ? 'green' : task.status === 'In Progress' ? 'orange' : 'red',
    }}>
      Status: {task.status}
    </Text>
    <Text style={{ fontSize: 12, marginTop: 4, color: '#6e6e6e' }}>Priority: {task.priority}</Text>
  </View>
);

// Main component for the View Task page
const ViewTask = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 15 }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 15 }}>Your Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
      />
    </View>
  );
};

export default ViewTask;
