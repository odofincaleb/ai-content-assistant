import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Clipboard from 'expo-clipboard';

const API_BASE = (Constants as any).expoConfig?.extra?.apiBase || (Constants as any).manifest?.extra?.apiBase || 'https://feedback-api-production-fd15.up.railway.app';

type AnyLicense = Record<string, any>;
const getKey = (l: AnyLicense) => (l?.licenseKey || l?.license_key || l?.key || l?.id || '').toString();
const getName = (l: AnyLicense) => (l?.customer_name || l?.customerName || l?.name || l?.email || 'Unnamed');

export default function App() {
  const [licenses, setLicenses] = useState<AnyLicense[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [extendKey, setExtendKey] = useState<string | undefined>();
  const [extendDays, setExtendDays] = useState('30');
  const [showCreateLicense, setShowCreateLicense] = useState(false);
  const [newLicense, setNewLicense] = useState({
    email: '',
    plan: 'basic',
    seats: '1',
    days: '30'
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/licenses`);
      const data = await res.json();
      setLicenses(Array.isArray(data) ? data : data?.licenses || []);
    } catch (e) {
      Alert.alert('Error', 'Failed to load licenses');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = licenses.filter(l => {
    const q = query.toLowerCase();
    return getKey(l).toLowerCase().includes(q) || (l?.email||'').toLowerCase().includes(q) || getName(l).toLowerCase().includes(q);
  });

  const put = async (key: string, body: any) => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/licenses/${encodeURIComponent(key)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      await load();
    } catch (e) { Alert.alert('Error', 'Request failed'); } finally { setLoading(false); }
  };

  const onActivate = (l: AnyLicense) => put(getKey(l), { status: 'active' });
  const onSuspend = (l: AnyLicense) => put(getKey(l), { status: 'suspended' });
  
  const onExtend = async () => {
    if (!extendKey) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/licenses/${encodeURIComponent(extendKey)}/extend`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ days: parseInt(extendDays||'30',10) }) });
      setExtendKey(undefined);
      await load();
    } catch (e) { Alert.alert('Error', 'Extend failed'); } finally { setLoading(false); }
  };

  const copyKey = async (key: string) => {
    try {
      await Clipboard.setStringAsync(key);
      Alert.alert('Copied', key);
    } catch {
      Alert.alert('Copy failed');
    }
  };

  const createLicense = async () => {
    if (!newLicense.email) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/licenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newLicense.email,
          plan: newLicense.plan,
          seats: parseInt(newLicense.seats),
          days: parseInt(newLicense.days)
        })
      });
      
      if (res.ok) {
        Alert.alert('Success', 'License created successfully');
        setShowCreateLicense(false);
        setNewLicense({ email: '', plan: 'basic', seats: '1', days: '30' });
        await load();
      } else {
        Alert.alert('Error', 'Failed to create license');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to create license');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 48, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>License Manager (Mobile)</Text>
      
      {/* Create License Button */}
      <TouchableOpacity 
        onPress={() => setShowCreateLicense(true)}
        style={{ 
          backgroundColor: '#059669', 
          paddingHorizontal: 16, 
          paddingVertical: 12, 
          borderRadius: 8, 
          marginBottom: 12,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Create New License</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TextInput 
          placeholder="Search by key, email, or name" 
          value={query} 
          onChangeText={setQuery} 
          style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 }} 
        />
        <TouchableOpacity onPress={load} style={{ backgroundColor: '#1d4ed8', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Refresh</Text>
        </TouchableOpacity>
      </View>
      
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      
      <FlatList
        style={{ marginTop: 16, flex: 1 }}
        data={filtered}
        keyExtractor={(item) => getKey(item) || Math.random().toString(36)}
        renderItem={({ item }) => {
          const key = getKey(item);
          return (
            <View style={{ borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 10, marginBottom: 12 }}>
              <Text style={{ fontWeight: '700' }}>{key || 'license_key_missing'}</Text>
              <Text style={{ color: '#555', marginTop: 2 }}>{getName(item)} • {item.plan || '-'} • {item.status || '-'}</Text>
              <Text style={{ color: '#777', marginTop: 2 }}>Seats: {item.seats ?? '-'} • Devices/User: {item.maxDevicesPerUser ?? '-'} • Max systems: {item.maxSystems ?? '-'}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <TouchableOpacity onPress={() => key && copyKey(key)} style={{ backgroundColor: '#6b7280', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setExtendKey(key)} style={{ backgroundColor: '#0369a1', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Extend</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onActivate(item)} style={{ backgroundColor: '#16a34a', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Activate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSuspend(item)} style={{ backgroundColor: '#dc2626', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Suspend</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Create License Modal */}
      {showCreateLicense && (
        <View style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20
        }}>
          <ScrollView style={{ 
            backgroundColor: '#fff', 
            borderRadius: 16, 
            padding: 20, 
            maxHeight: '80%',
            width: '100%'
          }}>
            <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 16 }}>Create New License</Text>
            
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Email</Text>
            <TextInput 
              value={newLicense.email}
              onChangeText={(text) => setNewLicense({...newLicense, email: text})}
              placeholder="customer@example.com"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 }}
              keyboardType="email-address"
            />
            
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Plan</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
              {['basic', 'standard', 'premium', 'enterprise'].map(plan => (
                <TouchableOpacity 
                  key={plan}
                  onPress={() => setNewLicense({...newLicense, plan})}
                  style={{ 
                    paddingHorizontal: 12, 
                    paddingVertical: 8, 
                    borderRadius: 8, 
                    backgroundColor: newLicense.plan === plan ? '#1d4ed8' : '#f3f4f6'
                  }}
                >
                  <Text style={{ color: newLicense.plan === plan ? '#fff' : '#000' }}>{plan}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Seats</Text>
            <TextInput 
              value={newLicense.seats}
              onChangeText={(text) => setNewLicense({...newLicense, seats: text})}
              placeholder="1"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 }}
              keyboardType="numeric"
            />
            
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>Duration (days)</Text>
            <TextInput 
              value={newLicense.days}
              onChangeText={(text) => setNewLicense({...newLicense, days: text})}
              placeholder="30"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20 }}
              keyboardType="numeric"
            />
            
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity 
                onPress={createLicense}
                style={{ 
                  backgroundColor: '#059669', 
                  paddingHorizontal: 16, 
                  paddingVertical: 12, 
                  borderRadius: 8,
                  flex: 1
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Create License</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setShowCreateLicense(false)}
                style={{ 
                  backgroundColor: '#6b7280', 
                  paddingHorizontal: 16, 
                  paddingVertical: 12, 
                  borderRadius: 8,
                  flex: 1
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Extend License Modal */}
      {extendKey && (
        <View style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20
        }}>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 16, 
            padding: 20, 
            width: '100%',
            maxWidth: 400
          }}>
            <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>Extend License</Text>
            <Text style={{ color: '#444', marginBottom: 16 }}>{extendKey}</Text>
            <TextInput 
              value={extendDays} 
              onChangeText={setExtendDays} 
              keyboardType="number-pad" 
              placeholder="Days" 
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16 }} 
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={onExtend} style={{ backgroundColor: '#1d4ed8', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, flex: 1 }}>
                <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Extend</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setExtendKey(undefined)} style={{ backgroundColor: '#6b7280', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, flex: 1 }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}


