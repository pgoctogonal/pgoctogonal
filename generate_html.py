import os

import re

def reset_section(section=None, line=0):
  if line > 0:
    print('##### ',line, section)
  return {'left': None, 'chord': None, 'right': None}


def replace_multiple_spaces(string):
    # Use regular expression to replace consecutive spaces with a single space
    processed_string = re.sub(r'\s+', ' ', string)
    return processed_string  

def parse_line(_str):
  #display(_str)
  parts = _str.split('<')
  #display(parts)
  sections = []
  section = reset_section()
  current_section = reset_section()
  last_part = None
  if len(parts) > 1:
    for ix, part in enumerate(parts):
      if part == '':
        continue
      left, chord, right = None, None, None

      if '>' in part:
        chord, right = part.split('>')
        if left == None and len(sections)>0:
          if sections[-1]['right'][-1] != ' ':
            last_section_right = sections[-1]['right'].split()
            sections[-1]['right'] = ' '.join(last_section_right[:-1])
            left = f'{last_section_right[-1]} '
      else:
        left = replace_multiple_spaces(part)
        
      if left is not None:
        section['left'] = left if left != '' else '&nbsp'
      if chord is not None:
        section['chord'] = chord if chord != '' else '&nbsp'
      if right is not None:
        if right != '':
          #display(right)
          if right.startswith(' '):
            section['right'] = '&nbsp'
            sections.append(section)
            section = reset_section()             
            section['left'] = right.strip()
          else:
            #print('Inicio sem espaco')
            section['right'] = right  

        #section['right'] = right if right != '' else '&nbsp'
      if section['chord'] is not None:
        sections.append(section)
        if section['right'] is None:
          section['right'] = ''
        section = reset_section()        
      last_part = part
    if section['left'] is not None or\
    section['right'] is not None or\
    section['chord'] is not None:
      sections.append(section)
    return sections
  else:
    section['left'] = _str
  return [section]


def main():
    # get all songs
    song_files = [f for f in os.listdir("./songs") if f.endswith('.txt')]

    for song_file in song_files:
        with open(f'./songs/{song_file}', 'r') as f:
            song_lines = f.readlines()

        html_lines = []
        for line in song_lines:
            if line.startswith('#'):
                html_lines.append(f'<div class="None">{line}</div>')  
                continue     
            if line.strip() == '':
                html_lines.append(f'<div class="inter-stanza">{line}</div>')       
                continue
            html_lines.append('<div class="line">')            
            line_dict_list = parse_line(line.strip())
            for line_dict in line_dict_list:
                
                if line_dict['left'] is not None:
                    html_lines.append(f'''<div class="word">
                        <span class="no-space">{ line_dict["left"] }</span>
                    </div> ''')
                if line_dict['chord'] is not None:
                    html_lines.append(f'''<div class="word-with-chord-beginning">
                                            <div class="chord-letter">
                                                <span class="chord"> {line_dict["chord"]}</span>
                                            </div>
                                            <span class="word-part"> { line_dict["right"] }</span>
                                        </div>''')
                    
            html_lines.append('</div>')

        html_content = '\n'.join(html_lines)

        # generate html file
        with open(f'./{song_file[:-4]}.html', 'w') as f:
            f.write(html_content)


if __name__ == "__main__":
    main()
    
    
