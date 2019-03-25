# web-lib-binaryjson

A small JavaScript library to parse Qt Binary JSON.

The array functionality is probably completely broken, and the integer parsing probably 
needs a bunch of edge case implementations as well (especially in regards to the 
compression Qt applies).

Basically: *add more tests!!!* Also, add a build & distribution system!


## Useful links

- [Our code that produces what we want to consume](https://github.com/reMarkable/xochitl/blob/687451acdb234b11a1e4d6c9acee6ff141d06549/src/liveview.cpp#L343)
- [Qt documentation](https://doc.qt.io/Qt-5/qjsondocument.html#toBinaryData)
- [The actual Qt serializer](https://github.com/qt/qtbase/blob/dev/src/corelib/serialization/qjson_p.h)
- [Another JS parser](https://github.com/corn3lius/qtBinaryJsonHelper)
