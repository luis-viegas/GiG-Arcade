# may do: set password automatic
# TODO

$root_dir = $args[0]
Set-Location $root_dir

$database_git_path = "https://git.fe.up.pt/gig-arcade/zip.git"
$file_path = ".\list_of_copied_games.txt"
$recently_added_file_path = ".\recently_added_games.txt"
$decompressed_rep_path = "..\renderer\decompressed_games"
$database_rep_path = "..\zip"
$database_rep_start = "..\"

if(!(Test-Path -Path $decompressed_rep_path)){
    Set-Location $root_dir
    New-Item -ItemType "directory" -Path $decompressed_rep_path
}


# construct list of already saved submodules
$submodules_list = [System.Collections.ArrayList]::new()
$new_submodules_list = [System.Collections.ArrayList]::new()
if (Test-Path -Path $file_path -PathType Leaf){
    Get-Content $file_path | ForEach-Object{
        $submodules_list.Add($_)
    }
}else{
    try {
        New-Item -ItemType File -Path $file_path -Force -ErrorAction Stop
        Write-Host "File [$file_path] created."
    } catch {
        throw $_.Exception.Message
    }
}

#create recently_added_file
New-Item -ItemType File -Path $recently_added_file_path -Force -ErrorAction Stop

#check if repository exists
if(!(Test-Path -Path $database_rep_path)){
    Set-Location $root_dir
    Set-Location $database_rep_start
    git clone $database_git_path
}


# pull all submodules
Set-Location $root_dir
Set-Location $database_rep_path
Write-Host "Pulling Ziped Submodules"
# git submodule update --init --recursive
git pull #--recurse-submodules


# for each subdirectory
Get-ChildItem "." -Filter "*.zip"| ForEach-Object{
    $name = $_.Name
    if (!$submodules_list.Contains($name)) {
        # copy contents from submodules

        $folder_name = ((Get-Item $name).Basename)
        Write-Host $folder_name
        $dest = -join($root_dir,"\..\",'renderer\',"decompressed_games", "\", $folder_name)
        Write-Host $dest
        # Write-Host $dest
        Expand-Archive -Path $name -Force -DestinationPath $dest
        
        # $zip_path = -join($root_dir, "\", $name, ".zip")
        # write-host $zip_path
        # git archive --output=$zip_path --format=zip RELEASE
        # Set-Location $root_dir
        # $zip_path = ".\"+$name+".zip"
        # if ($LASTEXITCODE -ne 0) {
        #     if(Test-Path -Path $zip_path -PathType Leaf){
        #         Remove-Item $zip_path -Recurse
        #     }
        #     Write-Host "Failed to copy submodule [$name] or tag RELEASE was not found" 
        # }else{
        #     $new_zip_path = -join($database_rep_path, "\", $name, ".zip")
        #     if(Test-Path -Path $zip_path -PathType Leaf){
        #         Move-Item -Path $zip_path -Destination $new_zip_path
        #     }
            #if nothing goes wrong add to list
            $new_submodules_list.Add($name)
            # Write-Host "Successfully archived [$name]"
        # }
    } 
}
Set-Location $root_dir

#add new entries to file
Add-Content $file_path $new_submodules_list
Add-Content $recently_added_file_path $new_submodules_list
# if ($new_submodules_list.Count -gt 0){
#     Set-Location $database_rep_path
#     Write-Host "Pushing changes to remote database"
#     $message = "update"
#     git add -A
#     git commit -m $message
#     git push origin master
#     Set-Location $root_dir
# } 