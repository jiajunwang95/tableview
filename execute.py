import subprocess

absolute_python_files = ["sample.py"]

for x in absolute_python_files:
    #Hmmm...
    process = subprocess.Popen(['python',x], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # Read the output from the subprocess
    output, _ = process.communicate()

    # Decode the output from bytes to string
    output_str = output.decode('utf-8')

    # Alternatively, you can save the output into a variable
    captured_messages = output_str.splitlines()

    # Print the captured messages line by line
    sql_statement = ''
    for index,message in enumerate(captured_messages):
        if(index == 0):
            column_array = message.split(" ")
            insert_column = "'"+"','".join(column_array)+"'"
            # print(insert_column)
            sql_statement = 'INSERT INTO TABLE ({}) VALUES\n'.format(insert_column)
        else:
            value_array = message.split(" ")
            insert_value = "'"+"','".join(value_array)+"'"
            sql_statement += "({}),\n".format(insert_value)
    sql_statement =sql_statement.rstrip(",\n")
    ## Execute the sql
    print(sql_statement)
#Store it into db...