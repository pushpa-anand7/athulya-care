import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimatedTabScreen } from '../components/AnimatedTabScreen';
import { CustomTabBar } from '../components/CustomTabBar';
import { AppointmentDetailsScreen } from '../screens/AppointmentDetailsScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { BookAppointmentScreen } from '../screens/BookAppointmentScreen';
import { CallEndedScreen } from '../screens/CallEndedScreen';
import { ConsultHomeScreen } from '../screens/ConsultHomeScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DoctorListScreen } from '../screens/DoctorListScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { AiAssistantScreen } from '../screens/AiAssistantScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SelectAvailabilityScreen } from '../screens/SelectAvailabilityScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { HealthRecordDetailScreen } from '../screens/HealthRecordDetailScreen';
import { HealthRecordsHistoryScreen } from '../screens/HealthRecordsHistoryScreen';
import { ReportsScreen } from '../screens/ReportsScreen';
import { SupportScreen } from '../screens/SupportScreen';
import { VideoConsultationScreen } from '../screens/VideoConsultationScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import {
  AppointmentsStackParamList,
  AuthStackParamList,
  ConsultStackParamList,
  MainTabParamList,
  RootStackParamList,
  ReportsStackParamList,
  SupportStackParamList,
} from '../types/navigation';
import {
  fadeTransition,
  modalFromBottom,
  slideFromBottom,
  slideFromRight,
} from './transitions';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppointmentsStack =
  createNativeStackNavigator<AppointmentsStackParamList>();
const ConsultStack = createNativeStackNavigator<ConsultStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: '#fff' },
      }}
      initialRouteName="Splash"
    >
      <AuthStack.Screen
        name="Splash"
        component={SplashScreen}
        options={fadeTransition}
      />
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={slideFromRight}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={slideFromBottom}
      />
    </AuthStack.Navigator>
  );
}

function AppointmentsNavigator() {
  return (
    <AppointmentsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: '#fff' },
        ...slideFromRight,
      }}
    >
      <AppointmentsStack.Screen
        name="AppointmentsList"
        options={fadeTransition}
      >
        {(props) => (
          <AnimatedTabScreen variant="fadeUp">
            <AppointmentsScreen {...props} />
          </AnimatedTabScreen>
        )}
      </AppointmentsStack.Screen>
    </AppointmentsStack.Navigator>
  );
}

function ConsultNavigator() {
  return (
    <ConsultStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: '#fff' },
        ...slideFromRight,
      }}
      initialRouteName="ConsultHome"
    >
      <ConsultStack.Screen name="ConsultHome">
        {(props) => (
          <AnimatedTabScreen variant="fadeUp">
            <ConsultHomeScreen {...props} />
          </AnimatedTabScreen>
        )}
      </ConsultStack.Screen>
      <ConsultStack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={modalFromBottom}
      />
      <ConsultStack.Screen name="DoctorList" component={DoctorListScreen} />
      <ConsultStack.Screen
        name="SelectAvailability"
        component={SelectAvailabilityScreen}
      />
      <ConsultStack.Screen
        name="AppointmentDetails"
        component={AppointmentDetailsScreen}
      />
      <ConsultStack.Screen
        name="VideoConsultation"
        component={VideoConsultationScreen}
        options={{
          animation: 'fade',
          animationDuration: 400,
          gestureEnabled: false,
        }}
      />
      <ConsultStack.Screen
        name="CallEnded"
        component={CallEndedScreen}
        options={modalFromBottom}
      />
    </ConsultStack.Navigator>
  );
}

const SupportStack = createNativeStackNavigator<SupportStackParamList>();
const ReportsStack = createNativeStackNavigator<ReportsStackParamList>();

function SupportNavigator() {
  return (
    <SupportStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: '#fff' },
        ...slideFromRight,
      }}
    >
      <SupportStack.Screen name="SupportHome">
        {(props) => (
          <AnimatedTabScreen variant="fadeDown">
            <SupportScreen {...props} />
          </AnimatedTabScreen>
        )}
      </SupportStack.Screen>
    </SupportStack.Navigator>
  );
}

function ReportsNavigator() {
  return (
    <ReportsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: '#fff' },
        ...slideFromRight,
      }}
    >
      <ReportsStack.Screen name="ReportsHome">
        {(props) => (
          <AnimatedTabScreen variant="fadeUp">
            <ReportsScreen {...props} />
          </AnimatedTabScreen>
        )}
      </ReportsStack.Screen>
      <ReportsStack.Screen
        name="HealthRecordsHistory"
        component={HealthRecordsHistoryScreen}
      />
      <ReportsStack.Screen
        name="HealthRecordDetail"
        component={HealthRecordDetailScreen}
      />
    </ReportsStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <AnimatedTabScreen variant="fadeUp">
            <DashboardScreen {...props} />
          </AnimatedTabScreen>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Appointments"
        component={AppointmentsNavigator}
        options={{ animation: 'shift' }}
      />
      <Tab.Screen name="Consult" component={ConsultNavigator} />
      <Tab.Screen name="Reports" component={ReportsNavigator} />
      <Tab.Screen name="Support" component={SupportNavigator} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={fadeTransition}
        />
        <RootStack.Screen
          name="Main"
          component={MainTabs}
          options={slideFromBottom}
        />
        <RootStack.Screen
          name="AiAssistant"
          component={AiAssistantScreen}
          options={slideFromBottom}
        />
        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={slideFromRight}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
