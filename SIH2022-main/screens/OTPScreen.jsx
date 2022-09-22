import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useRef } from 'react';

import OtpInput from '../components/OTPInput';

export default function OtpScreen( { navigation } ) {
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState();
    const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();
    const [value6, setValue6] = useState();

    const b1Ref = useRef(null);
    const b2Ref = useRef(null);
    const b3Ref = useRef(null);
    const b4Ref = useRef(null);
    const b5Ref = useRef(null);
    const b6Ref = useRef(null);

    const focusB2 = () => b2Ref.current.focus(); 
    const focusB3 = () => b3Ref.current.focus(); 
    const focusB4 = () => b4Ref.current.focus(); 
    const focusB5 = () => b5Ref.current.focus(); 
    const focusB6 = () => b6Ref.current.focus(); 


  return (
    <View style={styles.container}>
        
        <View style={styles.headingContainer}>
            <Text style={styles.Heading}>Enter OTP</Text>
        </View>

        <View style={styles.otpInputContainer}>
            <OtpInput value={value1} setText={setValue1} setRef={b1Ref} focusNext={focusB2} autofocus={true}/>
            <OtpInput value={value2} setText={setValue2} setRef={b2Ref} focusNext={focusB3} autofocus={false}/>
            <OtpInput value={value3} setText={setValue3} setRef={b3Ref} focusNext={focusB4} autofocus={false}/>
            <OtpInput value={value4} setText={setValue4} setRef={b4Ref} focusNext={focusB5} autofocus={false}/>
            <OtpInput value={value5} setText={setValue5} setRef={b5Ref} focusNext={focusB6} autofocus={false}/>
            <OtpInput value={value6} setText={setValue6} setRef={b6Ref} focusNext={null} autofocus={false}/>
        </View>

        <View style={styles.buttonContainer}>
            <Pressable onPress={() => {}} style={styles.buttonStyle}>
                <Text>Verify</Text>
            </Pressable>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  otpInputContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  headingContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  Heading: {
    fontSize: 30,
    fontWeight: "bold",
  },

  buttonContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "stretch",
    padding: 25,
    marginTop: 15,
  },

  buttonStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#F7F7F7',
    justifyContent: "center",
    alignItems: "center",
  },
})
