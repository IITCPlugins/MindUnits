require "csv"
require "json"

FILENAME = "fields_2024_10_20 123649.csv"

data = CSV.read(FILENAME, headers: true)

toObject = data.map do |row|
  { points: [
    { lat: row[0].to_f, lng: row[1].to_f },
    { lat: row[2].to_f, lng: row[3].to_f },
    { lat: row[4].to_f, lng: row[5].to_f },
  ],
   mu: row[6].to_i }
end

File.open("fields.json", "w") do |f|
  f.write(toObject.to_json)
end
