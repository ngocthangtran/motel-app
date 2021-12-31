import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Button, List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AfterInteractions } from '../../components/common';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import SectionWrapper from '../../components/common/SectionWrapper';
import DashboardItem from '../../components/DashboardItem';
import { dashboardItems } from '../../constants';
import { useNavigation } from '@react-navigation/native';

function MangeHomeScreen(props) {
  const user = useSelector(state => state.auth.user);
  const navigation = useNavigation();
  const handleItemPress = path => () => navigation.navigate(path);
  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={`Xin chào ${user?.name || ''}`} color='#fff' />
      </Appbar.Header>
      <View style={styles.container}>
        <AfterInteractions>
          <SectionWrapper title='Bảng điều khiển chính'>
            <Surface style={styles.itemsContainer}>
              {dashboardItems.map(item => {
                return (
                  <DashboardItem
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    onPress={handleItemPress(item.path)}
                  />
                );
              })}
            </Surface>
          </SectionWrapper>
          <SectionWrapper title='Thông tin và hỗ trợ'>
            <Surface>
              <List.Item
                title='Chưa hiểu rõ các tính năng?'
                description='Liên hệ ngay để được hỗ trợ'
                left={props => <List.Icon {...props} icon='help-circle' />}
              />
              <Button
                icon='phone'
                mode='contained'
                color='#fff'
                style={styles.helpButton}
                contentStyle={{ justifyContent: 'flex-start' }}
              >
                Hỗ trợ trực tiếp
              </Button>
              <Button
                icon='alpha-z-circle'
                mode='contained'
                color='#fff'
                style={styles.helpButton}
                contentStyle={{ justifyContent: 'flex-start' }}
              >
                Chat qua ZALO
              </Button>
            </Surface>
          </SectionWrapper>
        </AfterInteractions>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  helpButton: {
    marginVertical: 6,
  },
});

export default React.memo(MangeHomeScreen);
