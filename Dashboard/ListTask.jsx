// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ListTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all'); // 'all', 'pending', 'inProgress', 'completed'

//   // Fetch all tasks
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");
//       const response = await axios.get("http://192.168.1.39:3000/api/tasks", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTasks(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//       setError("Failed to load tasks");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Filter tasks based on status
//   const filteredTasks = filter === 'all' 
//     ? tasks 
//     : tasks.filter(task => {
//         if (filter === 'pending') return task.status === 'Pending';
//         if (filter === 'inProgress') return task.status === 'In Progress';
//         if (filter === 'completed') return task.status === 'Completed';
//         return true;
//       });

//   // Get status badge style
//   const getStatusBadge = (status) => {
//     let bgColor = 'bg-gray-100';
    
//     if (status === 'Pending') bgColor = 'bg-red-100 text-red-800';
//     if (status === 'In Progress') bgColor = 'bg-yellow-100 text-yellow-800';
//     if (status === 'Completed') bgColor = 'bg-green-100 text-green-800';
    
//     return `inline-block px-2 py-1 text-xs font-semibold rounded-full ${bgColor}`;
//   };

//   if (loading) {
//     return <div className="p-4 text-center">Loading tasks...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      
//       {/* Filter buttons */}
//       <div className="mb-4 flex gap-2">
//         <button 
//           onClick={() => setFilter('all')}
//           className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           All
//         </button>
//         <button 
//           onClick={() => setFilter('pending')}
//           className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Pending
//         </button>
//         <button 
//           onClick={() => setFilter('inProgress')}
//           className={`px-3 py-1 rounded ${filter === 'inProgress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           In Progress
//         </button>
//         <button 
//           onClick={() => setFilter('completed')}
//           className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Completed
//         </button>
//       </div>
      
//       {/* Tasks summary */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded shadow">
//           <div className="text-sm text-gray-500">Total Tasks</div>
//           <div className="text-2xl font-bold">{tasks.length}</div>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <div className="text-sm text-gray-500">Pending</div>
//           <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'Pending').length}</div>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <div className="text-sm text-gray-500">In Progress</div>
//           <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'In Progress').length}</div>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <div className="text-sm text-gray-500">Completed</div>
//           <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'Completed').length}</div>
//         </div>
//       </div>

//       {/* Task list */}
//       <div className="bg-white rounded shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <tr key={task._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div className="font-medium text-gray-900">{task.title}</div>
//                     <div className="text-sm text-gray-500">{task.description}</div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{task.location}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{task.date}</td>
//                   <td className="px-6 py-4">
//                     <span className={getStatusBadge(task.status)}>
//                       {task.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {task.assignedTo ? (
//                       <div>
//                         {task.assignedTo.name || "User ID: " + task.assignedTo}
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">Unassigned</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {task.lastUpdated ? new Date(task.lastUpdated).toLocaleString() : "Not updated"}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                   No tasks found matching the selected filter
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Completed task details section */}
//       {filter === 'completed' && (
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-4">Completed Tasks Details</h2>
//           <div className="bg-white rounded shadow p-4">
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <div key={`detail-${task._id}`} className="mb-4 p-4 border-b">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-bold">{task.title}</h3>
//                       <p className="text-sm text-gray-600">{task.description}</p>
//                       <p className="text-sm text-gray-600">Location: {task.location}</p>
//                     </div>
//                     <div className="text-right">
//                       <span className={getStatusBadge(task.status)}>
//                         {task.status}
//                       </span>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Completed on: {task.lastUpdated ? new Date(task.lastUpdated).toLocaleString() : "Unknown"}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="mt-3">
//                     <p className="text-sm">
//                       <span className="font-semibold">Completed by:</span> {task.assignedTo ? (task.assignedTo.name || "User ID: " + task.assignedTo) : "Unknown"}
//                     </p>
                    
//                     {task.photo && (
//                       <div className="mt-2">
//                         <p className="text-xs font-semibold text-gray-500">Completion Photo:</p>
//                         <div className="mt-1 h-24 w-24 rounded overflow-hidden">
//                           <img src={task.photo} alt="Task completion" className="h-full w-full object-cover" />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No completed tasks found</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListTask;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.1.39:3000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === 'all'
      ? tasks
      : tasks.filter((task) => {
          if (filter === 'pending') return task.status === 'Pending';
          if (filter === 'inProgress') return task.status === 'In Progress';
          if (filter === 'completed') return task.status === 'Completed';
          return true;
        });

  const getStatusStyle = (status) => {
    if (status === 'Pending') return styles.statusPending;
    if (status === 'In Progress') return styles.statusInProgress;
    if (status === 'Completed') return styles.statusCompleted;
    return styles.statusDefault;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Task Management</Text>

      {/* Filters */}
      <View style={styles.filterRow}>
        {['all', 'pending', 'inProgress', 'completed'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterBtn,
              filter === f && styles.activeFilter,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={filter === f ? styles.activeText : styles.defaultText}>
              {f === 'inProgress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <SummaryBox title="Total Tasks" count={tasks.length} />
        <SummaryBox title="Pending" count={tasks.filter(t => t.status === 'Pending').length} />
        <SummaryBox title="In Progress" count={tasks.filter(t => t.status === 'In Progress').length} />
        <SummaryBox title="Completed" count={tasks.filter(t => t.status === 'Completed').length} />
      </View>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <View key={task._id} style={styles.taskCard}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDesc}>{task.description}</Text>
            <Text style={styles.taskInfo}>Location: {task.location}</Text>
            <Text style={styles.taskInfo}>Date: {task.date}</Text>
            <Text style={[styles.statusBadge, getStatusStyle(task.status)]}>
              {task.status}
            </Text>
            <Text style={styles.taskInfo}>
              Assigned To: {task.assignedTo?.name || `User ID: ${task.assignedTo || 'Unassigned'}`}
            </Text>
            <Text style={styles.taskInfo}>
              Last Updated: {task.lastUpdated ? new Date(task.lastUpdated).toLocaleString() : 'Not updated'}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noTasksText}>No tasks found matching the selected filter</Text>
      )}

      {/* Completed Task Details */}
      {filter === 'completed' && filteredTasks.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Completed Task Details</Text>
          {filteredTasks.map((task) => (
            <View key={`detail-${task._id}`} style={styles.completedCard}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDesc}>{task.description}</Text>
              <Text style={styles.taskInfo}>Location: {task.location}</Text>
              <Text style={styles.taskInfo}>Completed by: {task.assignedTo?.name || `User ID: ${task.assignedTo}`}</Text>
              <Text style={styles.taskInfo}>
                Completed on: {task.lastUpdated ? new Date(task.lastUpdated).toLocaleString() : 'Unknown'}
              </Text>

              {task.photo && (
                <Image source={{ uri: task.photo }} style={styles.image} />
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const SummaryBox = ({ title, count }) => (
  <View style={styles.summaryBox}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={styles.summaryCount}>{count}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    margin: 4,
  },
  activeFilter: {
    backgroundColor: '#3b82f6',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  defaultText: {
    color: '#111',
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDesc: {
    color: '#6b7280',
  },
  taskInfo: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 2,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  completedCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusPending: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  statusInProgress: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusDefault: {
    backgroundColor: '#e5e7eb',
    color: '#374151',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default ListTask;
