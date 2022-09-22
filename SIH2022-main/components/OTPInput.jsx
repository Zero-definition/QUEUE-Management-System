// React and React Native imports
import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

export default function OtpInput({value, setText, setRef, focusNext, autofocus}) {
    const [filled, setFilled] = useState(false);

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{...styles.container, borderStyle: filled ? 'solid' : 'dashed'}}>

        <TextInput 
            style={styles.textInput} 
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            value={value}
            ref={setRef}
            returnKeyType="next"
            autoFocus={autofocus}
            onChangeText={
                text => {
                    setText(text);
                    if(text.length != 0) {
                        if(focusNext)
                            focusNext();
                    }
                }
                }>

        </TextInput>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },

    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        margin: 5,
        aspectRatio: 1,
    }
});