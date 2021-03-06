#include <QDebug>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QFile>

int main(int argc, char *argv[])
{

    QJsonObject obj1;
    obj1[QString("shortString")] = "banarama";
    obj1["longString"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
    obj1["smallDouble"] = 0.00000123;
    obj1["largeDouble"] = 1236752167366.00000123;

    QJsonArray jsonArray;
    jsonArray.push_back(1);
    jsonArray.push_back(2);
    jsonArray.push_back("333");
    jsonArray.push_back(213123213232.123213);
    jsonArray.push_back(obj1);
    jsonArray.push_back(true);
    jsonArray.push_back(1263876123);
    jsonArray.push_back("asdlkjaslkjdklsajd");
    jsonArray.push_back(QString("Das auto ist das bestest"));

    QFile out("array.dat");
    if (!out.open(QIODevice::WriteOnly)) {
        qWarning() << "failed to open";
        return 1;
    }

    out.write(QJsonDocument(jsonArray).toBinaryData());
    return 0;
}
