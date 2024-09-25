
while getopts 'if*:' flag; do
 case $flag in
   i) 
    echo 'AVAILABILITY TEST'
    echo '----'
    echo 'Test URL /test/test_starting'
    curl -I http://localhost:8000/test/test_starting
    echo 'Test URL /get_vsachieve_list'
    curl --header "Content-Type: application/json" \
    --request POST \
    --data \
    '{
      "company_id": "0",
      "interval_value": 5,
      "page_num": "1",
      "search_value_pair": [
        {
          "value_name": "agentName",
          "value": "Pe"
        }
      ]
    }' \
    http://localhost:8000/get_vsachieve_list
    curl --header "Content-Type: application/json" \
    --request POST \
    --data \
    '{
      "company_id": "0",
      "interval_value": 20,
      "page_num": "0",
      "search_value_pair": []
    }' \
    http://localhost:8000/get_vsachieve_list
   ;;
   f) 
    echo 'FALSE TEST'
    curl -I http://localhost:8000/1234
   ;;
   *)
    echo "Invalid option ${flag}" 
   ;;
 esac
done

if (( $# == 0 )); then
    curl http://localhost:8000/test/test_starting
    curl http://localhost:8000/get_vsachieve_list_first/0
    curl http://localhost:8000/get_vsachieve_list_next/0/1641600000
    curl http://localhost:8000/search_vsachieve_list_by_param/0/1641600000/2505600000
    curl http://localhost:8000/search_vsachieve_list_by_param/0/1641600000/2505600000/Pe
    curl http://localhost:8000/search_vsachieve_list_by_param/0/unset/unset/Pe
fi