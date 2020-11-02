import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, View, Animated, FlatList,
  Image, Text, ScrollView, Dimensions } from 'react-native';
import { CollapsingDrawerLayout } from 'components';
import * as Assets from 'assets';
import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import { screenDimens } from 'constants';

const Img = (name, params) => (
  <Image
    source={name}
    resizeMode="stretch"
    tintColor={params.tintColor}
    style={{ height: params.height, width: params.width }}
  />
);

const Home = () => {
  const headerHeight = 210;
  const bottomNaviHeight = 60;
  const initialDrawerShowHeight = screenDimens.height * 0.6;

  const renderCollapsingBanner = () => {
    return (
      Img(Assets.orangeBannerTop, { width: screenDimens.width, height: 160 })
    );
  };

  const renderLeftFadeView = () => {
    return (
      Img(Assets.group50, styles.fadingCharts)
    );
  };

  const renderRightFadeView = () => {
    return (
      Img(Assets.group51, styles.fadingCharts)
    );
  };

  const renderScrollViewHeader = () => {
    return (
      <View style={[{ height: headerHeight }, styles.mainListbg]}>
        <View style={[styles.header, { flex: 1 }]}>
          <Text style={[styles.subHeadings, { paddingTop: 40 }]}>Main Pound Account</Text>
          <View style={styles.signWrap}>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={styles.subHeadings}>  £  </Text>
            </View>
            <Text style={styles.amount}>278.00</Text>
            <View style={styles.qrbox}>
              {Img(Assets.qrpink, { width: 14, height: 14 })}
            </View>
          </View>
        </View>
        <View
          style={[styles.header, { flex:1 },
            styles.roundedBottomLeft]}
        >
          <Text style={styles.subHeadings}>Suggestions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces overScrollMode='auto'
            style={{ width: '100%' }}
          >
            {[1,2,3,4,5,6,7,8,9].map(i =>
              (
                <View key={i} style={styles.suggestionItemsWrap}>
                  {Img(Assets.abc, styles.suggestionItems)}
                </View>
              )
            )
            }
          </ScrollView>
        </View>
      </View>

    );
  };

  const renderScrollViewContent = () => {
    const listData = ['a','b','c','d','e','f','g','h','i','j','k','l'];
    const renderItem = ({item}) => (
      <View key={item} style={styles.itemWraper}>
        <Text>item</Text>
      </View>
    );

    const seperator = () => (
      <View style={{backgroundColor:'black',height:1}}/>
    );

    return (
      <View style={styles.mainListbg}>
        <View style={styles.mainListMargins}>

          <View style={styles.searchbox} />

          <View style={styles.listWrap}>
            {listData.map((item)=>{
              return(
                renderItem(item)
              )
            })}
          </View>

        </View>
      </View>

    );
  };

  return (
    <View style={styles.container}>

      <CollapsingDrawerLayout
        collapsingBanner={() => renderCollapsingBanner()}
        leftFadeView={() => renderLeftFadeView()}
        rightFadeView={() => renderRightFadeView()}
        scrollViewheader={() => renderScrollViewHeader()}
        scrollViewContent={() => renderScrollViewContent()}
        shadowOnTopLayer={false}
        minimumDragHeight={0}

        initialDrawerShowHeight={initialDrawerShowHeight}
        bottomNaviHeight={bottomNaviHeight}
      />
      <View style={styles.profileWrap}>
        {Img(Assets.profile, styles.profileImg)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  placeholder: {
    backgroundColor: '#65C888',
    height: 50,
    marginHorizontal: '2%',
    marginTop: 20,
  },
  roundedTop: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  roundedBottomLeft: {
    borderBottomLeftRadius: 40,
  },
  header: {
    backgroundColor: 'white',
  },
  mainListbg: {
    backgroundColor: '#E5E5E5',
  },
  subHeadings: {
    color: '#C0C0C0',
    fontSize: 12,
    paddingLeft: 10,
    paddingBottom: 4,
  },
  signWrap: {
    flexDirection: 'row',
    width: '100%',
  },
  amount: {
    color: '#000',
    fontSize: 30,
    fontWeight: '700',
  },
  qrbox: {
    position: 'absolute',
    right: 30,
    top: 10,
    backgroundColor: '#EEEEEE',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  profileWrap: {
    position: 'absolute',
    top: 25,
    left: 15,
  },
  fadingCharts: {
    width: screenDimens.width / 2 - 20,
    height: 120,
  },
  suggestionItemsWrap: {
    marginLeft: 10,
    marginTop: 5,
  },
  suggestionItems: {
    width: 130,
    height: 60,
  },
  profileImg: {
    width: 25,
    height: 25,
  },
  searchbox: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: 40,
    width: '96%'
  },
  listWrap: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: '6%',
    width: '96%',
    padding: '5%'
  },
  mainListMargins: {
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '6%'
  },
  itemWraper:{
    height:30,
    justifyContent:'center',
    margin:2,
    borderBottomColor:'black',
    borderBottomWidth: 0.7
  }
});

export default observer(() => Home());
