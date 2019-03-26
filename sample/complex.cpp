#include <QDebug>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QFile>

int main(int argc, char *argv[])
{
    QJsonArray arr1;
    arr1.push_back(1);
    arr1.push_back(2);
    arr1.push_back("333");
    arr1.push_back(213123213232.123213);

    QJsonObject obj1;
    obj1[QString("shortString")] = "banarama";
    obj1["longString"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
    obj1["smallDouble"] = 0.00000123;
    obj1["largeDouble"] = 1236752167366.00000123;

    QJsonObject obj2;
    obj2["foo"] = "banarama";
    obj2[QString("bar")] = 1234.56;
    obj2["obj1"] = obj1;
    obj2["arr1"] = arr1;
    obj2["trve"] = true;
    obj2["grim"] = false;

    QJsonArray arr2;
    arr2.push_back(QString("Das auto ist das bestest"));
    arr2.push_back("Das auto ist das bestest");
    arr2.push_back(1);
    arr2.push_back(1263876123);
    arr2.push_back(213123213232.123213);
    arr2.push_back(obj1);
    arr2.push_back(0.000002132);
    arr2.push_back(obj2);
    arr2.push_back(arr1);
    arr2.push_back(true);
    arr2.push_back(1);
    arr2.push_back(false);
    arr2.push_back(-1654213);
    arr2.push_back(0);

    QJsonObject jsonObject;
    jsonObject["id"] = QString("Das auto ist das bestest");
    jsonObject["page"] = QString::number(123);
    jsonObject[QString("Das auto ist das bestest")] = QString::number(qlonglong(7213987123));
    jsonObject[QString("obj1")] = obj1;
    jsonObject["arr2"] = arr2;
    jsonObject["obj1"] = obj1; //TODO: This was stupid!
    jsonObject["negative"] = -12321312;
    jsonObject["negative2"] = -12321312.213761273;

    QFile out("complex.dat");
    if (!out.open(QIODevice::WriteOnly)) {
        qWarning() << "failed to open";
        return 1;
    }

    out.write(QJsonDocument(jsonObject).toBinaryData());
    return 0;
}
