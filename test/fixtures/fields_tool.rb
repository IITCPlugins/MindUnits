require "json"

DIR="."

def readAllJSONs
  allData = []
  Dir.glob("#{DIR}/fields*.json").each do |fname|
    puts "Loading: #{fname}"
    data = JSON.load File.new(fname)
    allData += data
  end

  return allData
end


def removeDuplicates(data)
  # test for differences
  duplicates = data.group_by { |x| x["latlngs"].to_json }
    .select { |k, v| (v.uniq { |x| x["mindunits"] }).size > 1 }

  if duplicates.size > 0
    puts "Found fields with different MindUnits"
    duplicates.each { |k, v|
      puts " Field #{k}"
      puts "  #{v.map { |x| x["mindunits"] }}"
    }
  end

  # and remove
  filtered = data.uniq { |x| x["latlngs"].to_json }
  return filtered
end


def splitIntoFiles(data)
  throw "no data" if data.length == 0
  split = data.shuffle.each_slice((data.length / 2.0).ceil)

  split.each_with_index do |selection, index|
    File.open("#{DIR}/fields_#{index + 1}.json", "w") do |f|
      f.write(selection.to_json)
    end
  end
end


def filterArea(data, lat1,lng1,lat2,lng2)
  data.select {|field|  
    field["latlngs"].any? { |ll| ll["lat"]>=lat1 && ll["lat"]<=lat2 && ll["lng"]>=lng1 && ll["lng"]<=lng2}
  }
end


data = readAllJSONs
data = removeDuplicates(data)
data = filterArea(data, 51.109013, 6.589786, 52.181551, 7.884682 )
splitIntoFiles(data)
