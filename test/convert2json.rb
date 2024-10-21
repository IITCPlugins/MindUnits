require "csv"

FILENAME = "fields_2024_10_20 123649.csv"


data = CSV.read(FILENAME, headers: true)

p data
# toObject =
