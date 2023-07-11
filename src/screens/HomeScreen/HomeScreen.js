import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [uploadedTickets, setUploadedTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [scannedTickets, setScannedTickets] = useState(0);

  useEffect(() => {
    // Fetch the total tickets and scanned tickets from local storage
    const fetchTicketsFromLocalStorage = async () => {
      try {
        const total = await AsyncStorage.getItem('totalTickets');
        const upload = await AsyncStorage.getItem('uploadedTickets');
        const scanned = await AsyncStorage.getItem('scannedTickets');
        setTotalTickets(parseInt(total) || 0);
        setUploadedTickets(parseInt(upload) || 0);
        setScannedTickets(parseInt(scanned) || 0);
      } catch (error) {
        console.log('Error fetching tickets from local storage:', error);
      }
    };

    fetchTicketsFromLocalStorage();
  }, []);

  const handleSyncTickets = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const total = data.length;
        const dataTickets = JSON.stringify(data);
  
        // Save the data to local storage
        AsyncStorage.setItem('totalTickets', total.toString())
          .then(() => {
            console.log('Total tickets synced successfully.');
            AsyncStorage.setItem('dataTickets', dataTickets)
            .then(() => {
              console.log('Data tickets synced successfully.');
              fetchTicketsFromLocalStorage();
              })
              .catch((error) => {
                console.log('Error syncing data tickets:', error);
              });
          })
          .catch((error) => {
            console.log('Error syncing total tickets:', error);
          });
      })
      .catch((error) => {
        console.log('Error fetching data from the API:', error);
      });
  };
  

  const handleUploadTickets = () => {
    // Upload the scanned tickets to the API
    // Replace 'your-api-endpoint' with the actual endpoint URL
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scannedTickets }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Scanned tickets uploaded successfully:', data);
      })
      .catch((error) => {
        console.log('Error uploading scanned tickets:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20, color: '#fff' }}>
        Hi, Admin
      </Text>
      <Text style={styles.text}>
        Total Tickets: {totalTickets}
      </Text>
      <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>
        Uploaded Tickets: {uploadedTickets}
      </Text>
      <Button
        title="Sync Ticket"
        onPress={handleSyncTickets}
        style={{ marginTop: 20 }}
      />
      <Text style={{ fontSize: 18, color: '#fff', marginVertical: 20 }}>
        Scanned Tickets: {scannedTickets}
      </Text>
      <Button
        title="Upload Ticket"
        onPress={handleUploadTickets}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 16,
    backgroundColor: '#051954',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  }
});

export default Home;
