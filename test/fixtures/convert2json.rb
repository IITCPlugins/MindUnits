require "csv"
require "json"

allData = []

Dir.glob("fields*.csv").each do |fname|
  data = CSV.read(fname, headers: true)

  toObject = data.map do |row|
    { points: [
      { lat: row[0].to_f, lng: row[1].to_f },
      { lat: row[2].to_f, lng: row[3].to_f },
      { lat: row[4].to_f, lng: row[5].to_f },
    ],
      mu: row[6].to_i }
  end

  allData += toObject
end

split = allData.shuffle.each_slice((allData.length / 2.0).ceil)

split.each_with_index do |selection, index|
  File.open("fields_#{index + 1}.json", "w") do |f|
    f.write(selection.to_json)
  end
end
