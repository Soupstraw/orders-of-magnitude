from bs4 import BeautifulSoup
import re
import json

content = ""
with open("length_data.html") as f:
    content = f.read()
soup = BeautifulSoup(content, "html.parser")
regex = re.compile("^(\d+(\.\d+)?)(–\d+(\.\d+))?\s*(metres|\w?m)\s*[–-]\s*(.* [–-])?(.*)")
list_elems = soup.find_all(string=regex)
json_data = []
for elem in list_elems:
    #res = elem.find(re.compile("\d"))
    txt = elem.parent.get_text()
    txt = re.sub(r'\[.*\]', '', txt)
    num = re.sub(regex, r'\1', txt)
    mag = re.sub(regex, r'\5', txt)
    desc = re.sub(regex, r'\7', txt)
    #print(res)
    try:
        json_data.append({
            "cardMagnitude": float(num),
            "unit": mag,
            "cardDescription": desc
        })
    except ValueError:
        print("skipping")

with open("output.json", 'w') as f:
    f.write(json.dumps(json_data))
