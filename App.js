/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import Moment from "moment";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Toast,
  Button
 } from "native-base";
 

export default class BookMeetingByRoomSlotsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      meetingRoomId: 508,
      slotData: [
        {
          id: 512,
          featureKey: "REGULAR",
          title: "Test2  pm",
          startTime: 1559809800000,
          endTime: 1559813400000
        },
        {
          id: 507,
          featureKey: "REGULAR",
          title: "8pm upto",
          startTime: 1559831400000,
          endTime: 1559835000000
        }
      ],
      curTime: null
    };
  }
  //slotData: [{id: 512, featureKey: "REGULAR", title: "Test10 pm", startTime: 1556555460000, endTime: 1556555700000},
  //{id: 507, featureKey: "REGULAR", title: "11pm upto", startTime: 1556556060000, endTime: 1556559000000}],

  componentWillMount = () => {
    // this.getServicesData();
  };
  componentWillUnmount() {
    // TimerMixin.clearInterval(this.timer);
  }

  Unix_timestamp_hours(t) {
    let date = new Date(t);
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? +hours : hours;
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    time = hours + ":" + minutes + am_pm;
    return time;
  }
  Unix_timestamp_In_Minutes(t) {
    let dt = new Date(t);
    let hr = dt.getHours() * 60;
    let m = "0" + dt.getMinutes();
    //let s = "0" + dt.getSeconds();
    let minutes = hr + parseInt(m.substr(-2));
    return minutes;
  }

  render() {
    let getCurrentMilliSeconds = Moment().valueOf();

    let startTime = Moment().hour();
    startTime = startTime % 2 == 0 ? startTime : startTime - 1;
    let payments = [];
    let timeInMin = [];
    let dateTime;
    let timeflag = false;
    let datashowVal = this.state.slotData;
    if (
      !!datashowVal[0] &&
      Math.floor(
        this.Unix_timestamp_In_Minutes(datashowVal[0].startTime) / 60
      ) > getCurrentMilliSeconds
    ) {
      startTime = Math.floor(
        this.Unix_timestamp_In_Minutes(datashowVal[0].startTime) / 60
      );
    }

    for (let i = startTime * 60; i <= 1440; i++) {
   
      if (i % 60 == 0 || i == 0) {
        borderAdd = true;
      }
      if (i % 60 == 0 || i == 0) {
        k = i / 60;
        if (k <= 12) {
          k == 0
            ? (dateTime = 12 + " Am")
            : k == 12
            ? (dateTime = k + " Pm")
            : (dateTime = k + " Am");
        } else {
          k >= 24 ? (dateTime = k - 12 + " Am") : (dateTime = k - 12 + " Pm");
        }

        timeInMin.push(
          <View key={i}>
            <View key={i} style={{ flexDirection: "row", width:(i>=1380)?width(18):width(24) }}>
              <Text>{dateTime} </Text>
            </View>
          </View>
        );
      }

      //debugger;
      for (let userData of datashowVal) {
        if (
          this.Unix_timestamp_In_Minutes(userData.startTime) <= i &&
          this.Unix_timestamp_In_Minutes(userData.endTime) >= i
        ) {
          timeflag = true;
          meetingId = userData.id;
          checkType = true;
        }
      }

      payments.push(
        <View key={i} style={{ flexDirection: "column" }}>
          <View
            style={
              borderAdd
                ? styles.bookingListChildWhite
                : timeflag
                ? styles.bookingListChildRed
                : styles.bookingListChildGreen
            }
          />
        </View>
      );
      borderAdd = false;
      timeflag = false;
    }
    return (
      <Container style={styles.meetingSlotShow}>
        <ScrollView>
          <ScrollView horizontal>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.flexRow}>{payments}</View>
              <View style={{ flexDirection: "row" }}>{timeInMin}</View>
            </View>
          </ScrollView>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  meetingSlotShow: {
    marginTop: width(14),
  },
  flexRow: {
    flexDirection: "row"
  },
  bookingListChildRed: {
    width: width(0.4),
    height: height(4),
    backgroundColor: "red"
  },
  bookingListChildWhite: {
    width: width(0.4),
    height: height(4),
    backgroundColor: "#FFFFFF"
  },
  bookingListChildGreen: {
    width: width(0.4),
    height: height(4),
    backgroundColor: "green"
  },
});