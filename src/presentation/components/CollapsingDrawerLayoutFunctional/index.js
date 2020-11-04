import React from 'react';
import { StyleSheet, View, Animated, ScrollView, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import { screenDimens } from 'constants';

export class CollapsingDrawerLayout extends React.Component {

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      canScroll: false,
      snappedHighest: false,
    };

    //appearance variables
    this.customContentHeight = screenDimens.height
    - this.props.bottomNaviHeight
    - this.props.initialDrawerShowHeight;
    this.snapPointMid = this.customContentHeight * -1;
    this.shadowHeight = this.props.shadowOnTopLayer ? 5 : 0;
    this.scrowViewHeight = screenDimens.height / 2; //TODO correct height to be solved
    this.customMinimumDragHeight =
    this.props.minimumDragHeight !== undefined ? this.props.minimumDragHeight : 0;

    //snap points variables
    this.snaps = {
      low: { id: 'snap_low', val: 0 },
      mid: { id: 'snap_mid', val: this.snapPointMid / 2 },
      high: { id: 'snap_high', val: this.snapPointMid - 1 + this.customMinimumDragHeight },
    };
  }

  onSnap = (event) => {
    const { id } = event.nativeEvent;
    const canScroll = id === this.snaps.high.id;
    this.setState({ canScroll: canScroll});
  }

  onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= 0) {
      this.setState({ canScroll: false });
    }
  }

  onDrag = (event) => {

    const { state, targetSnapPointId } = event.nativeEvent;
    if (state === 'end' && targetSnapPointId === this.snaps.mid.id) {
      if (this.props.onSnappedToMiddle) {
        this.props.onSnappedToMiddle();
      }
    } else if (state === 'end' && targetSnapPointId === this.snaps.low.id) {
      if (this.props.onSnappedToBottom) {
        this.props.onSnappedToBottom();
      }
    }
  }

  renderFadingView = (content) => {
    return (
      <Animated.View
        style={{
          opacity: this._deltaY.interpolate({
            inputRange: [-150, 0],
            outputRange: [0, 1],
          }),
          transform: [
            { scale: this._deltaY.interpolate({
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
  }

  render() {
    const snaps = this.snaps;
    return (
      <View style={styles.container}>
        <View
          style={[styles.layerUnderDrawer,
            { height: this.customContentHeight }
          ]}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this._deltaY.interpolate({
                    inputRange: [this.snapPointMid, this.snapPointMid, 0, 0],
                    outputRange: [this.snapPointMid / 1.8 + 15, this.snapPointMid / 1.8 + 15, 0, 0]
                    // first 2 numbers set to be half of snapPointMid
                    // so that the target only moves half of the original distance
                    // i.e. it does not get 'pushed' all the way the whole distance
                    //the effect is that the target looks as if it remains in center
                  })
                },
              ],
            }}
          >
            <View>
              {this.props.collapsingBanner()}
            </View>

            <View style={styles.fadingViewsContainer}>
              {this.renderFadingView(this.props.leftFadeView)}
              {this.renderFadingView(this.props.rightFadeView)}
            </View>
          </Animated.View>

        </View>
        <View>

          <Interactable.View
            style={{ marginTop: -this.shadowHeight - this.customMinimumDragHeight}}
            verticalOnly
            snapPoints={[
              { y: this.snaps.low.val, id: this.snaps.low.id },
              { y: this.snaps.high.val, id: this.snaps.high.id },
              { y: this.snaps.mid.val, id: this.snaps.mid.id },
            ]}
            boundaries={{
              top: this.snapPointMid + this.shadowHeight,
              bottom: this.customMinimumDragHeight,
            }}
            onSnap={this.onSnap}
            onDrag={this.onDrag}
            animatedValueY={this._deltaY}
            showsVerticalScrollIndicator={false}
          >

            <If condition={this.props.shadowOnTopLayer}>
              <LinearGradient
                  colors={['transparent', 'rgba(24,24,24,0.4)','rgba(45,45,45,0.3)']}
                  style={
                    [styles.shadow,
                      this.props.shadowRadius?
                      { borderTopLeftRadius:this.props.shadowRadius,
                        borderTopRightRadius:this.props.shadowRadius}:
                      styles.flatborder
                    ]}>
              </LinearGradient>
            </If>
            <View style={[styles.scrollviewHeader]}>
              {this.props.scrollViewheader()}
            </View>

            <ScrollView
              bounces={false}
              scrollEnabled={this.state.canScroll}
              onScroll={this.onScroll}
              showsVerticalScrollIndicator={false}
              style={[
                { height: this.scrowViewHeight },
                styles.scrollview,
              ]}
            >

              <View style={[styles.scrollviewContent]}>
                {this.props.scrollViewContent()}
                <View style={styles.scrollviewBottomDummy} />
              </View>

            </ScrollView>
          </Interactable.View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  layerUnderDrawer: {
    //height: this.defaultContentHeight,
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
