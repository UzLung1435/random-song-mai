import os
import xml.etree.ElementTree as ET
import json

def parse_music_xml(root_dir, output_file):
    music_list = []

    # 遍历文件夹
    for root, dirs, files in os.walk(root_dir):
        if 'Music.xml' in files:
            xml_path = os.path.join(root, 'Music.xml')
            try:
                tree = ET.parse(xml_path)
                xml_root = tree.getroot()

                # 提取基本信息
                music_id = xml_root.find('name/id').text
                name = xml_root.find('name/str').text
                artist = xml_root.find('artistName/str').text
                bpm = xml_root.find('bpm').text
                add_version = xml_root.find('AddVersion/str').text

                # 提取 Notes 相关列表
                levels = []
                decimals = []
                designers = []

                notes_nodes = xml_root.findall('.//notesData/Notes')
                for note in notes_nodes:
                    is_enable = note.find('isEnable').text.lower() == 'true'
                    if is_enable:
                        levels.append(note.find('level').text)
                        decimals.append(note.find('levelDecimal').text)
                        designers.append(note.find('notesDesigner/str').text)

                # 构建 JSON 对象
                music_data = {
                    "musicid": music_id,
                    "info": {
                        "name": name,
                        "artistName": artist,
                        "bpm": bpm,
                        "AddVersion": add_version,
                        "levelList": levels,
                        "noteDesignerList": designers,
                        "aliasNameList": "", # 以后要是有api请求了那就顺手加
                        "levelDecimalList": decimals
                    }
                }
                
                music_list.append(music_data)
                print(f"已处理: {name} (ID: {music_id})")

            except Exception as e:
                print(f"解析文件 {xml_path} 时出错: {e}")

    # 写入 JSON 文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(music_list, f, ensure_ascii=False, indent=4)
    
    print(f"\n处理完成！总计 {len(music_list)} 条数据，已保存至 {output_file}")

# --- 执行脚本 ---
if __name__ == "__main__":
    # 请修改此处为你存放 Music.xml 的主目录
    target_directory = 'D:\Applications\Games\SEGA\SDGB_1.50\Sinmai_Data\StreamingAssets\A000\music' 
    # 输出文件名
    output_json = '.\public\music_info.json'
    
    if os.path.exists(target_directory):
        parse_music_xml(target_directory, output_json)
    else:
        print("错误：找不到指定的目录，请检查 target_directory 变量。")