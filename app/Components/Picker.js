import React, { useState } from 'react';

import { View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

export default function Picker({initialValue, pickerItems}) {
  // console.log("Initial value: ", pickerItems);
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(pickerItems);

  return (
    // <View style={{
    //   backgroundColor: '#171717',
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingHorizontal: 15
    // }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        // schema={{
        //     label:'label',
        //     value:'value',
        //     icon:'image'
        // }}
        // theme="DEFAULT"
        style={{backgroundColor:"rgba(40, 167, 227, 0.1)", borderColor:'#28A7E3'}}
        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        containerStyle={{width:'85%'}}
      />
    // </View>
  );
}