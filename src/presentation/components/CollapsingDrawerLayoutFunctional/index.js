import React from 'react';
import { StyleSheet, View, Animated, ScrollView, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import { screenDimens } from 'constants';
import { useSelector, useDispatch } from 'react-redux'; //indead of connect()
import { actions } from './actionCreators.js';

export const CollapsingDrawerLayout = (props) => {

  //useSelector replaces mapPropsToState()
  const scrollState = useSelector(state => state.collapsingLayoutReducer.canScroll);
  const snappedHighestState = useSelector(state => state.collapsingLayoutReducer.snappedHighest);
  const _deltaY = useSelector(state => state.collapsingLayoutReducer._deltaY);
  //const _deltaY = new Animated.Value(0);

  const dispatch = useDispatch();
  //appearance variables
  const customContentHeight = screenDimens.height
  - props.bottomNaviHeight
  - props.initialDrawerShowHeight;
  const snapPointMid = customContentHeight * -1;
  const shadowHeight = props.shadowOnTopLayer ? 5 : 0;
  const scrowViewHeight = screenDimens.height / 2; //TODO correct height to be solved
  const customMinimumDragHeight =
  props.minimumDragHeight !== undefined ? props.minimumDragHeight : 0;

  //snap points variables
  const snaps = {
    low: { id: 'snap_low', val: 0 },
    mid: { id: 'snap_mid', val: snapPointMid / 2 },
    high: { id: 'snap_high', val: snapPointMid - 1 + customMinimumDragHeight },
  };

  const onSnap = (event) => {
    const { id } = event.nativeEvent;
    const canScroll = id === snaps.high.id;
    dispatch(actions.setScrollability(canScroll));
  };

  const onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= 0) {
      dispatch(actions.setSnappedHighest(false));
    }
  };

  const onDrag = (event) => {

    const { state, targetSnapPointId } = event.nativeEvent;
    if (state === 'end' && targetSnapPointId === snaps.mid.id) {
      if (props.onSnappedToMiddle) {
        props.onSnappedToMiddle();
      }
    } else if (state === 'end' && targetSnapPointId === snaps.low.id) {
      if (props.onSnappedToBottom) {
        props.onSnappedToBottom();
      }
    }
  };

  const renderFadingView = (content) => {
    console.log('deltaY @renderFadingView', _deltaY);
    return (
      <Animated.View
        style={{
          opacity: _deltaY.interpolate({
            inputRange: [-150, 0],
            outputRange: [0, 1],
          }),
          transform: [
            { scale: _deltaY.interpolate({
              inputRange: [-150, -150, 0, 0],
              outputRange: [0, 0, 1, 1],
            }),
            },
          ],
        }}
      >
        {content()}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.layerUnderDrawer,
          { height: customContentHeight },
        ]}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: _deltaY.interpolate({
                  inputRange: [snapPointMid, snapPointMid, 0, 0],
                  outputRange: [snapPointMid / 1.8 + 15, snapPointMid / 1.8 + 15, 0, 0],
                  // first 2 numbers set to be half of snapPointMid
                  // so that the target only moves half of the original distance
                  // i.e. it does not get 'pushed' all the way the whole distance
                  //the effect is that the target looks as if it remains in center
                }),
              },
            ],
          }}
        >
          <View>
            {props.collapsingBanner()}
          </View>

          <View style={styles.fadingViewsContainer}>
            {renderFadingView(props.leftFadeView)}
            {renderFadingView(props.rightFadeView)}
          </View>
        </Animated.View>

      </View>
      <View>

        <Interactable.View
          style={{ marginTop: -shadowHeight - customMinimumDragHeight }}
          verticalOnly
          snapPoints={[
            { y: snaps.low.val, id: snaps.low.id },
            { y: snaps.high.val, id: snaps.high.id },
            { y: snaps.mid.val, id: snaps.mid.id },
          ]}
          boundaries={{
            top: snapPointMid + shadowHeight,
            bottom: customMinimumDragHeight,
          }}
          onSnap={onSnap}
          onDrag={onDrag}
          animatedValueY={_deltaY}
          showsVerticalScrollIndicator={false}
        >

          <If condition={props.shadowOnTopLayer}>
            <LinearGradient
              colors={['transparent', 'rgba(24,24,24,0.4)', 'rgba(45,45,45,0.3)']}
              style={
                [styles.shadow,
                  props.shadowRadius ?
                    { borderTopLeftRadius: props.shadowRadius,
                      borderTopRightRadius: props.shadowRadius } :
                    styles.flatborder,
                ]}
            />
          </If>
          <View style={[styles.scrollviewHeader]}>
            {props.scrollViewheader()}
          </View>

          <ScrollView
            bounces={false}
            scrollEnabled={scrollState}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            style={[
              { height: scrowViewHeight },
              styles.scrollview,
            ]}
          >

            <View style={[styles.scrollviewContent]}>
              {props.scrollViewContent()}
              <View style={styles.scrollviewBottomDummy} />
            </View>

          </ScrollView>
        </Interactable.View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  layerUnderDrawer: {
    //height: defaultContentHeight,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    height: 15,
    marginTop: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  scrollview: {
    backgroundColor: '#EEEEEE', //this will show if the content elements are short
    marginTop: -1, // there is a gap between header and content
  },
  scrollviewBottomDummy: {
    height: 20,
  },
  scrollviewHeader: {
    //header is not part of scrollView
    //because it recieves drag input constantly
    backgroundColor: 'transparent',
    marginTop: -10,
  },
  roundedTop: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  scrollviewContent: {
    flex: 1,
  },
  flatborder: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  fadingViewsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 13,
    marginRight: 13,
    justifyContent: 'space-between',
    top: 60,
    width: screenDimens.width - 26,
  },
});
