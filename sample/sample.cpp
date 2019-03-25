#include <QDebug>
#include <QJsonObject>
#include <QJsonDocument>
#include <QFile>

int main(int argc, char *argv[])
{
    QJsonObject foo;
    foo["foo"] = "banarama";
    foo["bar"] = 1234.56;

    QJsonObject jsonObject;
    jsonObject["id"] = QString("Das auto ist das bestest");
    jsonObject["page"] = QString::number(123);
    jsonObject["layer"] = QString::number(4);
    jsonObject["foo"] = foo;
    jsonObject["type"] = "foo";

    QFile out("sample.dat");
    if (!out.open(QIODevice::WriteOnly)) {
        qWarning() << "failed to open";
        return 1;
    }

    out.write(QJsonDocument(jsonObject).toBinaryData());
    return 0;
}
