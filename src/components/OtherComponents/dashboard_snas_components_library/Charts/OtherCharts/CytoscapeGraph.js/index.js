import React, {useState, useEffect, ReactElement } from "react";
import Cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import { TagFaces } from "@mui/icons-material";

Cytoscape.use(dagre);
// Cytoscape.use(COSEBilkent);

export default function CytoscapeGraph (props){
  const {chartData, splitter } = props
  const cytoscapeStylesheet = [
    {
      selector: "node",
      style: {
        "background-color": "maroon",
        width: "label",
        height: "label",
        padding: "6px",
        shape: "round-rectangle"
      }
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        "font-size": "12",
        color: "white",
        "text-halign": "center",
        "text-valign": "center"
      }
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        width: 1.5
      }
    },
    {
      selector: "edge[label]",
      style: {
        label: "data(label)",
        "font-size": "12",

        "text-background-color": "white",
        "text-background-opacity": 1,
        "text-background-padding": "2px",

        "text-border-color": "black",
        "text-border-style": "solid",
        "text-border-width": 0.5,
        "text-border-opacity": 1

        // "text-rotation": "autorotate"
      }
    }
  ]
  const [isLoading, setIsLoading] = useState(true)
  const [graphElements, setGraphElements] = useState([
    { data: { id: "a", label: "C:"} },
    { data: { id: "b", label: "ProgramFiles" } },
    { data: { id: "c", label: "Temp" } },
    { data: { id: "d", label: "Folder1" } },
    { data: { id: "e", label: "Folder2" } },
    { data: { id: "f", label: "Folder3" } },
    { data: { source: "a", target: "b" } },
    { data: { source: "a", target: "c" } },
    { data: { source: "b", target: "d" } },
    { data: { source: "d", target: "e" } },
    { data: { source: "c", target: "f"} },
    // { data: { source: "Completed", target: "Approved", label: "approve" } }
  ])
  const [layout,setLayout] = useState({
    name: "cose-bilkent",
    // other options
    padding: 50,
    nodeDimensionsIncludeLabels: true,
    // idealEdgeLength: 100,
    edgeElasticity: 0.1
    // nodeRepulsion: 8500,
  })

  let pathSplitKeyword = '\\'

  useEffect(() => {
    setIsLoading(true)
    if(chartData){
      let graphData
      if(splitter){
        graphData = modify_process_paths(chartData, splitter)
      }
      else{
        graphData = modify_process_paths(chartData)
      }
      graphData = convert_to_standard_format(graphData)
      // alert(JSON.stringify(graphData))
      setGraphElements(graphData)
      setLayout(     {
        name:'dagre',
        // animation:true,
      })
    }
    setTimeout(()=>{setIsLoading(false)}, 100)
  }, [chartData])

  const modify_process_paths = (paths, splitter='')=>{
    // modify to find common path elements such as usernames
    // try {
      if(splitter && splitter!==''){
        try {
          paths = paths.map(item=>{
            return [ item[0].replaceAll(splitter,'\\') ]
          })
        } catch (error) {
          console.log(error)
        }
      }

      let tempPathKeys = {}
      for(let key in paths){
        let item_key = paths[key][0].toString()
        if(item_key.includes('/')){
          item_key = item_key.split('/').join('\\')
        }
        if(item_key.startsWith('\\')){
          item_key = item_key.substring(1)
        }
        if(!item_key){
          item_key = '-'
        }  
        tempPathKeys[item_key] = ''
      }
      let while_loop_continue = true
      let level_counter = 1
      let signature_found = false
      let level_found= false
      let signatures = []
      let common_name_counter = 0
      while(while_loop_continue){
        if(level_counter>300){
          break
        }
        level_counter += 1
        signatures = []
        signature_found = false
        //signature find
        level_found = false
        
        for(let path_name in tempPathKeys){
                let signature_found_for_current_loop = false
                if(path_name===''){
                  continue
                }
                let first_path_prefix = ''
                let first_path_suffix = ''
                let first_path = path_name.split('\\')

                if(first_path.length > level_counter+2){
                    level_found = true
                    first_path_prefix = first_path[0]

                    for(let i=1; i<level_counter; i++){
                            first_path_prefix+='\\'+first_path[i]
                        }

                    first_path_suffix = first_path[level_counter+1]+'\\'+first_path[level_counter+2]
                }
                else{
                  continue
                }

                for(let s_key in signatures){
                      if(first_path_prefix===signatures[s_key]['prefix'] && first_path_suffix===signatures[s_key]['suffix']){
                        signature_found_for_current_loop = true
                        break
                      }
                }

                if(signature_found_for_current_loop===true){
                  continue
                }


                for(let path_name2 in tempPathKeys){
                        if(path_name2===''){
                          continue
                        }
                        let second_path_prefix = ''
                        let second_path_suffix = ''
                        let second_path = path_name2.split('\\')

                        if(second_path.length > level_counter+2){
                                second_path_prefix = second_path[0]
                                for(let i=1; i<level_counter; i++){
                                  second_path_prefix+='\\'+second_path[i]
                                }
                                second_path_suffix = second_path[level_counter+1]+'\\'+second_path[level_counter+2]
        
                                if(first_path_prefix === second_path_prefix && first_path_suffix === second_path_suffix  && first_path[level_counter]!=second_path[level_counter]){
                                  signature_found = true
                                  signatures.push({prefix:first_path_prefix, suffix:first_path_suffix})
                                  common_name_counter +=1
                                  break
                                }
                        }
              }
      }
      if(level_found===false){
        break
      }
      if(signatures.length===0){
        continue
      }
      else{
        let newPathKeys = {}
        for(let path_name in tempPathKeys){
              if(path_name===''){
                continue
              }
              let first_path = path_name.split('\\')
              let first_path_full_suffix = '\\common_name_' + common_name_counter 
              let first_path_prefix = ''
              let first_path_suffix = ''
              if(first_path.length > level_counter+2){
                first_path_prefix = first_path[0]
                for(let i=1; i<level_counter; i++){
                    first_path_prefix+='\\'+first_path[i]
                }
                first_path_suffix = first_path[level_counter+1]+'\\'+first_path[level_counter+2]
                for(let i=level_counter+1; i<first_path.length; i++){
                  first_path_full_suffix+='\\'+first_path[i]
                }
              }
              else{
                newPathKeys[path_name] = tempPathKeys[path_name]
                continue
              }
  
              let match_found = false
              for(let s_key in signatures){
                if(first_path_prefix===signatures[s_key]['prefix'] && first_path_suffix===signatures[s_key]['suffix']){
                  match_found = true
                  break
                }
              }
              if(match_found){
                if(! ((first_path_prefix+first_path_full_suffix) in newPathKeys)){
                  newPathKeys[first_path_prefix+first_path_full_suffix] = tempPathKeys[path_name]
                }
                else{
                  newPathKeys[first_path_prefix+first_path_suffix] += tempPathKeys[path_name]
                }
              }
              else{
                newPathKeys[path_name] = tempPathKeys[path_name]
              }
            }
            tempPathKeys = newPathKeys
      }
    }
    
    let temp = []
    for(let i in tempPathKeys){
      temp.push([i])
    }
    return temp
  }

  const convert_to_standard_format = (chartData)=>{
    let nodes = []
    let edges = []
    let pathSplitKeyword = '\\'
    const rootPath = '__'
    nodes.push(rootPath)
    for(let key in chartData){
      let path = chartData[key][0]
      if(path===''){
        continue
      }
      if( path!==undefined && path.length>0 ){
        path =path.split(pathSplitKeyword)
        let path_upto_i = ''
        for (let i = 0; i <(path.length -1); i++) {
          if(i===0){
            path_upto_i = path[i]
            if(! edges.includes((rootPath+'@@'+path[0]))){
              edges.push(rootPath+'@@'+path[0])
            }
          }
          else{
            path_upto_i += pathSplitKeyword + path[i]
          }
          if(!nodes.includes(path_upto_i)){
            nodes.push(path_upto_i)
          }
          let edge = path_upto_i+'@@'+path_upto_i + pathSplitKeyword + path[i+1]
          if(!edges.includes(edge)){
            edges.push(edge)
          }
        }
        if(!nodes.includes(chartData[key][0])){
          nodes.push(chartData[key][0])
        }
      }
    //  obj['user_friendly_label']= convert_date_to_uf_label(data.data[key][0])
    }
    // let tempGraphElements = treeTrimmer(nodes, edges)
    // nodes = tempGraphElements['nodes']
    // edges = tempGraphElements['edges']
    let tempGraphElements = []
    for(let key in nodes){
      let label = ''
      if(nodes[key]!==''){
        label = nodes[key].split(pathSplitKeyword)
        label = label[label.length-1]
      }
      tempGraphElements.push({data:{id:nodes[key], label:label}})
    }
    for(let key in edges){
      let edge = edges[key].split('@@')
      tempGraphElements.push({data:{source:edge[0], target:edge[1]}})
    }
    return tempGraphElements
  }


  const treeTrimmer = (nodes,edges)=>{
    // const maxNodeLimit = 3
    // const targetPerSource = {}
    // let source;
    // let row
    // for (row of edges){
    //   source = row.split('@@')[0]
    //   if(source in targetPerSource){
    //     targetPerSource[source]+=1
    //   }
    //   else{
    //     targetPerSource[source]=1
    //   }
    // }
    // let newNodes = []
    // let newEdges = []
    // let blockedSources = []
    // for( row of edges){
    //   let source = row.split('@@')[0]
    //   if(targetPerSource[source] > maxNodeLimit){
    //     if(! (blockedSources.includes(source) || source==='__')){
    //       blockedSources.push(source)
    //     }
    //     if(!newNodes.includes(source+'\\'+targetPerSource[source].toString()+' nodes')){
    //       newNodes.push(source+'\\'+targetPerSource[source].toString()+' nodes')
    //     }
    //     if(!newEdges.includes(source+'@@'+source+'\\'+targetPerSource[source].toString()+' nodes' )){
    //       newEdges.push(source+'@@'+source+'\\'+targetPerSource[source].toString()+' nodes' )
    //     }
    //   }
    // }
    // console.log({targetPerSource, blockedSources})
    // for (row of nodes){
    //   let includeNode = true 
    //   for( let source in blockedSources){
    //     if(row.startsWith(source) && row!==source){
    //       includeNode = false
    //       break
    //     }
    //   }
    //   if(includeNode && !newNodes.includes(row)){
    //     newNodes.push(row)
    //   }
    // }
    // console.log({nodes, newNodes})

    // for(let  edge of edges){
    //   let includeEdge = true 
    //   let edgeTarget = edge.split('@@')[1]
    //   for( let source in blockedSources){
    //     if(edgeTarget.startsWith(source) && edgeTarget!==source){
    //       includeEdge = false
    //       break
    //     }
    //   }
    //   if(includeEdge && !newEdges.includes(edge)){
    //     newEdges.push(edge)
    //   }
    // }
    // console.log({edges, newEdges})

    // return {newNodes, newEdges}
  }
  // if(isLoading===false){
  //   alert(JSON.stringify(graphElements))
  // }
  return (
    isLoading?null:
    <div style={{width:'100%', height:0.9*window.innerHeight }}>
    <CytoscapeComponent
      cy={(cy) => {
        cy.on("select", (_x) => {
          // consol.log("something was selected here");
        });
      }}
      elements={graphElements}
      layout={
        // layout
        {
          name:'dagre',
          // animation:true,
        }
      }
      style={{ top: 50, right:0,bottom: 0, position: "absolute", width: "100%", padding:'10px' }}
      stylesheet={cytoscapeStylesheet}
    />
    </div>
  );
};
